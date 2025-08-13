// index.js
const serverless = require('serverless-http');  //aws dynamodb
const app = require('./server'); // your existing server.js

module.exports.handler = serverless(app);