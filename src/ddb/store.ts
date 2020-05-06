import { DynamoDB } from 'aws-sdk';
import { Ddb } from './ddb'
import {config } from '../config/config';
import { RewardUpdatedRecord } from '../models/rewardUpdatedRecord';

const tableName = config.tableName;

export class Store {
    // static getSong(key: SongKey): Promise<DynamoDB.DocumentClient.GetItemOutput> {
    //      return Ddb.getItem(songTableName, key)
    // }

    static putRewardUpdatedRecords(rewardUpdatedRecords: RewardUpdatedRecord[]): Promise<DynamoDB.DocumentClient.BatchWriteItemOutput> {
        return Ddb.putItems(tableName, rewardUpdatedRecords);
    }

    static scan(): Promise<DynamoDB.DocumentClient.ScanOutput> {
        return Ddb.scan(tableName)
    }
}