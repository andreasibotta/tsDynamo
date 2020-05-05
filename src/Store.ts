import { DynamoDB } from 'aws-sdk';
import { config } from './config/config'

const dynamoDB = new DynamoDB.DocumentClient({
    endpoint: config.endpoint,
  });

export class Store {
  static getItem(tableName: string, key: any) {
    const getParams: DynamoDB.DocumentClient.GetItemInput = {
      TableName: tableName,
      Key: key,
    };
    
    return  dynamoDB.get(getParams).promise();

  }
}
