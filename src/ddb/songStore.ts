import { DynamoDB } from 'aws-sdk';
import { Ddb } from './ddb'
import {SongKey, Song}  from '../models/song';
import {config } from '../config/config';

const songTableName = config.tableName;

export class SongStore {
    static getSong(key: SongKey): Promise<DynamoDB.DocumentClient.GetItemOutput> {
         return Ddb.getItem(songTableName, key)
    }

    static putSong(song: Song): Promise<DynamoDB.DocumentClient.PutItemOutput> {
        return Ddb.putItem(songTableName, song);
    }

    static scan(): Promise<DynamoDB.DocumentClient.ScanOutput> {
        return Ddb.scan(songTableName)
    }
}