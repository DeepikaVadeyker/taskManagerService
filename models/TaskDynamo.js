const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'us-east-1' }); // change region if needed
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'Tasks';

// Get all tasks (optionally filter by status)
async function getTasks(status) {
  let params = { TableName: TABLE_NAME };
  const data = await docClient.send(new ScanCommand(params));

  if (status === 'active') return data.Items.filter(task => !task.completed);
  if (status === 'completed') return data.Items.filter(task => task.completed);
  return data.Items;
}

// Create a task
async function createTask(task) {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false,
      ...task
    }
  };
  await docClient.send(new PutCommand(params));
  return params.Item;
}

// Update a task
async function updateTask(id, updates) {
  let updateExpression = 'set';
  let ExpressionAttributeNames = {};
  let ExpressionAttributeValues = {};

  Object.keys(updates).forEach((key, index) => {
    updateExpression += ` #${key} = :${key},`;
    ExpressionAttributeNames['#' + key] = key;
    ExpressionAttributeValues[':' + key] = updates[key];
  });
  updateExpression = updateExpression.slice(0, -1);

  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: 'ALL_NEW'
  };

  const result = await docClient.send(new UpdateCommand(params));
  return result.Attributes;
}

// Delete a task
async function deleteTask(id) {
  await docClient.send(new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { id }
  }));
  return { id };
}

module.exports = { getTasks, createTask, updateTask, deleteTask };