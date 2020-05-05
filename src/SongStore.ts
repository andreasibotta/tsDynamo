import { DynamoDB } from 'aws-sdk';
import {Store } from './Store'
import {SongKey, Song}  from './song';
import {config } from './config/config';

const songTableName = config.tableName;

export class SongStore {
    static getSong(key: SongKey): Promise<DynamoDB.DocumentClient.GetItemOutput> {
         return Store.getItem(songTableName, key)
    }

    static putSong(song: Song): Promise<DynamoDB.DocumentClient.PutItemOutput> {
        return Store.putItem(songTableName, song);
    }

    static scan(): Promise<DynamoDB.DocumentClient.ScanOutput> {
        return Store.scan(songTableName)
    }
}