import { DynamoDB } from 'aws-sdk';
import { config } from './config/config';

const dynamoDB = new DynamoDB.DocumentClient({
  endpoint: config.endpoint,
});

export class Store {
  static getItem(tableName: string, key: any): Promise<DynamoDB.DocumentClient.GetItemOutput> {
    const getParams: DynamoDB.DocumentClient.GetItemInput = {
      TableName: tableName,
      Key: key,
    };
    return dynamoDB.get(getParams).promise();
  }

  static putItem(tableName: string, item: any): Promise<DynamoDB.DocumentClient.PutItemOutput> {
    const putParams: DynamoDB.DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: item,
    };

    return dynamoDB.put(putParams).promise();
  }

  static scan(tableName: string): Promise<DynamoDB.DocumentClient.ScanOutput> {
    const scanParams: DynamoDB.DocumentClient.ScanInput = {
      TableName: tableName,
    };

    return dynamoDB.scan(scanParams).promise();
  }
}
