import {Store } from './Store'
import {SongKey}  from './song';
import {config } from './config/config';

const songTableName = config.tableName;

export class SongStore {
    static getSong(key: SongKey) {
         return Store.getItem(songTableName, key)
    }
}