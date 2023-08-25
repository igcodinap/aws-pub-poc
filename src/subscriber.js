const AWS = require('aws-sdk');

// Configure the AWS SDK to use LocalStack
AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566',
});

const sqs = new AWS.SQS();

const queueUrl = 'http://localhost:4566/000000000000/test-queue1';

  function pollQueue() {
    sqs.receiveMessage({
      QueueUrl: queueUrl,
      WaitTimeSeconds: 10, // Long polling
    }, (err, messageData) => {
      if (err) {
        console.error('Error receiving message:', err);
        return;
      }

      if (messageData.Messages) {
        messageData.Messages.forEach((message) => {
          console.log('Received message:', message.Body);

          // Delete the message from the queue
          sqs.deleteMessage({
            QueueUrl: queueUrl,
            ReceiptHandle: message.ReceiptHandle,
          }, (err) => {
            if (err) {
              console.error('Error deleting message:', err);
            }
          });
        });
      }
      

      // Continue polling
      pollQueue();
    });
  }

  pollQueue();

