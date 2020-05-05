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
      MessageBody:
        'Information about current NY Times fiction bestseller for week of 12/11/2016.',
      QueueUrl: queueUrl,
    };
    sqs.sendMessage(params).promise();
  }
}
