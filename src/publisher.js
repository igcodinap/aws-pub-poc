const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  region: 'us-east-1', 
  endpoint: 'http://localhost:4566',
});
// Create SNS client
const sns = new AWS.SNS();

// Topic ARN
const topicArn = 'arn:aws:sns:us-east-1:000000000000:test-topic1';

// Message to be published
const message = 'Hello, World!';

// Publish parameters
const params = {
  Message: message,
  TopicArn: topicArn,
};

// Publish the message
sns.publish(params, (err, data) => {
  if (err) {
    console.error('Error publishing message:', err);
  } else {
    console.log('Message published:', data.MessageId);
  }
});
