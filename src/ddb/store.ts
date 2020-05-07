import { DynamoDB } from 'aws-sdk';
import { Ddb } from './ddb'
import {config } from '../config/config';
import { RewardUpdatedRecord } from '../models/rewardUpdatedRecord';
import { SponsoredOfferUpdatedRecord } from '../models/sponsoredOfferUpdatedRecord';

const tableName = config.tableName;

export class Store {
    // static getSong(key: SongKey): Promise<DynamoDB.DocumentClient.GetItemOutput> {
    //      return Ddb.getItem(songTableName, key)
    // }

    static async putRewardUpdatedRecords(rewardUpdatedRecords: RewardUpdatedRecord[]): Promise<DynamoDB.DocumentClient.BatchWriteItemOutput> {
        return Ddb.putItems(tableName, rewardUpdatedRecords);
    }

    static async putSponsoredOfferUpdatedRecords(sponsoredOfferUpdatedRecords: SponsoredOfferUpdatedRecord[]): Promise<DynamoDB.DocumentClient.BatchWriteItemOutput> {
      return Ddb.putItems(tableName, sponsoredOfferUpdatedRecords);
  }

    static async scan(): Promise<DynamoDB.DocumentClient.ScanOutput> {
        return Ddb.scan(tableName)
    }
}