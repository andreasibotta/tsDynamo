import { Context, SQSEvent ,SQSRecord,SQSRecordAttributes ,SQSMessageAttributes,SQSMessageAttribute} from 'aws-lambda';


const recordAttribute: SQSRecordAttributes = {
    AWSTraceHeader: 'trace',
    ApproximateReceiveCount: 'count',
    SentTimestamp: 'time',
    SenderId: 'sender',
    ApproximateFirstReceiveTimestamp: 'timestamp'
  }
  
  const messageAttribute: SQSMessageAttribute = {
    stringValue: 'string',
    binaryValue: 'true',
    stringListValues: [] as never[],
    binaryListValues: [] as never[],
    dataType: 'type'
  }
  const messageAttributes: SQSMessageAttributes = {
    'hello': messageAttribute
  }
  
  const sqsRecord: SQSRecord = {
    messageId: 'some-id',
    receiptHandle: 'some-handle',
    body: 'some-body',
    attributes: recordAttribute,
    messageAttributes: messageAttributes,
    md5OfBody: 'hash',
    eventSource: 'some-source',
    eventSourceARN: 'some-arn',
    awsRegion: 'some-region'
  }
  
  export const sqsEvent: SQSEvent = {
    Records: [
      sqsRecord
    ]
  };
  
  export const testContext: Context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: 'test',
    functionVersion: 'version zero',
    invokedFunctionArn: 'this:is:a:test',
    memoryLimitInMB: '128',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis: () => 10,
    done: () => {},
    fail: () => {},
    succeed: () => {},
  };

  