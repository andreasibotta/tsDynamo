'use strict';

import { SQSHandler, SQSEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { Song, SongKey } from './song';
import { SongStore } from './SongStore';
import { Sqs } from './sqs';

AWS.config.update({ region: 'REGION' });

const imagine: Song = {
  Artist: 'John Lennon',
  SongTitle: 'Imagine',
  Year: 1978,
};
const songKey: SongKey = {
  Artist: 'John Lennon',
  SongTitle: 'Imagine',
};

const handler: SQSHandler = async (event: SQSEvent) => {
  console.log('hello world!');
  // console.log(JSON.stringify(event));

  let scanResult = await SongStore.scan();
  console.log('Scan result: ', scanResult);

  const putResult = await SongStore.putSong(imagine);
  console.log('Put result: ', putResult);

  const getResult = await SongStore.getSong(songKey);
  console.log('Get result: ', getResult);

  scanResult = await SongStore.scan();
  console.log('Scan result: ', scanResult);

  Sqs.sendMessage('http://localhost:4576/queue/test-queue', 'hello');
};

export { handler };
