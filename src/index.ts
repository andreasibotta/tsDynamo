'use strict';

import { SQSHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { DynamoDB } from 'aws-sdk';
import {config } from './config/config'
import { Song,SongKey } from './song';
import { SongStore} from './SongStore'

AWS.config.update({ region: 'REGION' });

const dynamoDB = new DynamoDB.DocumentClient({
  endpoint: config.endpoint,
});

const tableName =  config.tableName;

const scanParams: DynamoDB.DocumentClient.ScanInput = {
  TableName: tableName,
};

const imagine: Song = {
  Artist: 'John Lennon',
  SongTitle: 'Imagine',
  Year: 1976
}
const putParams: DynamoDB.DocumentClient.PutItemInput = {
  TableName: tableName,
  Item: imagine,
};

const songKey: SongKey = {
  Artist: 'John Lennon',
  SongTitle: 'Imagine'
}

const handler: SQSHandler = async (event) => {
  console.log('hello world!');
  // console.log(JSON.stringify(event));

  let scanResult = await dynamoDB.scan(scanParams).promise();
  console.log('Scan result: ', scanResult);

  const putResult = await dynamoDB.put(putParams).promise();
  console.log('Put result: ', putResult);

  const getResult = await SongStore.getSong(songKey);
  console.log('Get result: ', getResult);

  scanResult = await dynamoDB.scan(scanParams).promise();
  console.log('Scan result: ', scanResult);
};

export { handler };
