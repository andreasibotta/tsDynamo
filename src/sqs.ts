import { SQS } from 'aws-sdk';

const sqs = new SQS();

export class Sqs {
  static sendMessage(queueUrl: string, message: any) {
    const params: SQS.SendMessageRequest = {
      DelaySeconds: 1,
      MessageAttributes: {
        Title: {
          DataType: 'String',
          StringValue: 'The Whistler',
        },
        Author: {
          DataType: 'String',
          StringValue: 'John Grisham',
        },
        WeeksOn: {
          DataType: 'Number',
          StringValue: '6',
        },
      },
      MessageBody: JSON.stringify(message),
      QueueUrl: queueUrl,
    };
    sqs.sendMessage(params).promise();
  }
}
