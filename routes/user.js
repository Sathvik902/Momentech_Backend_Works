const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.region,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});

const tableName = process.env.DYNAMODB_TABLE;

// Your code for handling the "/signup" route
router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  const params = {
    TableName: tableName,
    Item: {
      username: username,
      email: email,
      password: password,
    },
  };

  dynamoDBClient.put(params, (err) => {
    if (err) {
      console.error('Error creating item:', err);
      res.status(500).json({ error: 'Failed to create item' });
    } else {
      console.log('Item created successfully');
      res.sendStatus(201);
    }
  });
});

//login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Query DynamoDB to find the user based on username
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username,
      },
    };

    const result = await dynamoDBClient.query(params).promise();

    // If user not found, return error response
    if (result.Items.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Validate the user's password
    const user = result.Items[0];
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // User login successful
    return res.status(200).json({ message: 'User login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
