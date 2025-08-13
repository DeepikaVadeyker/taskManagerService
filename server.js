const express = require('express');
require('dotenv').config();
const cors = require('cors');
const tasksRouter = require('./routes/tasksDynamoDB');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);
app.get('/', (req, res) => res.send('Task Manager API running'));

// Only listen locally
if (process.env.IS_LOCAL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

module.exports = app; // export app for Lambda





// require('dotenv').config();
// const express = require('express');
// // const mongoose = require('mongoose'); //MongoDB version
// const cors = require('cors');

// // const tasksRouter = require('./routes/tasks'); MongoDB version
// const tasksRouter = require('./routes/tasksDynamoDB'); // DynamoDB version

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json()); // body parser

// // routes
// app.use('/api/tasks', tasksRouter);

// // health check route
// app.get('/', (req, res) => res.send('Task Manager API running'));
// /* // MongoDB version
// async function start() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected');
//     app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
//   } catch (err) {
//     console.error('Failed to start', err);
//   }
// }
//   */
// // DynamoDB version   

// async function start() {
//   try {
//     // Initialize DynamoDB connection if needed
//     // await initDynamoDB(); // Uncomment if you have a function to initialize DynamoDB   
//     app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
//   } catch (err) {
//     console.error('Failed to start', err);
//   }
// }
// start();