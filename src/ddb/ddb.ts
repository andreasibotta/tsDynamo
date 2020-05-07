import { DynamoDB } from 'aws-sdk';
import { config } from '../config/config';

const dynamoDB = new DynamoDB.DocumentClient({
  endpoint: config.endpoint,
});

export class Ddb {
  static async getItem(
    tableName: string,
    key: any
  ): Promise<DynamoDB.DocumentClient.GetItemOutput> {
    const getParams: DynamoDB.DocumentClient.GetItemInput = {
      TableName: tableName,
      Key: key,
    };
    return dynamoDB.get(getParams).promise();
  }

  static async putItem(
    tableName: string,
    item: any
  ): Promise<DynamoDB.DocumentClient.PutItemOutput> {
    const putParams: DynamoDB.DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: item,
    };

    return dynamoDB.put(putParams).promise();
  }

  static async putItems(
    tableName: string,
    items: any[]
  ): Promise<DynamoDB.DocumentClient.BatchWriteItemOutput> {
    let paramsItems: any[] = [];

    items.forEach((item) => {
      paramsItems.push({
        PutRequest: {
          Item: item,
        },
      });
    });

    let params = {
      RequestItems: {
        testTable: paramsItems,
      },
    };

    return dynamoDB.batchWrite(params).promise();
  }

  static async scan(tableName: string): Promise<DynamoDB.DocumentClient.ScanOutput> {
    const scanParams: DynamoDB.DocumentClient.ScanInput = {
      TableName: tableName,
    };

    return dynamoDB.scan(scanParams).promise();
  }
}
