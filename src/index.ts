'use strict';

import { SQSHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { DynamoDB } from 'aws-sdk';

AWS.config.update({ region: 'REGION' });

const dynamoDB = new DynamoDB.DocumentClient({
  endpoint: 'http://localhost:4569',
});

const tableName = 'testTable';

const scanParams: DynamoDB.DocumentClient.ScanInput = {
  TableName: tableName,
};

const putParams: DynamoDB.DocumentClient.PutItemInput = {
  TableName: tableName,
  Item: {
    Artist: 'John Lennon',
    SongTitle: 'Imagine',
  },
};

const getParams: DynamoDB.DocumentClient.GetItemInput = {
  TableName: tableName,
  Key: {
    'Artist': 'John Lennon',
    'SongTitle': 'Imagine'
  },
};

const handler: SQSHandler = async (event) => {
  console.log('hello world!');
  // console.log(JSON.stringify(event));

  let scanResult = await dynamoDB.scan(scanParams).promise();
  console.log('Scan result: ', scanResult);

  const putResult = await dynamoDB.put(putParams).promise();
  console.log('Put result: ', putResult);

  const getResult = await dynamoDB.get(getParams).promise();
  console.log('Get result: ', getResult);

  scanResult = await dynamoDB.scan(scanParams).promise();
  console.log('Scan result: ', scanResult);
};

export { handler };
