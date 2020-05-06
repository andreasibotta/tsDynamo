'use strict';

import { SQSHandler, SQSEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { Song, SongKey } from './models/song';
import { SongStore } from './ddb/songStore';
import { Sqs } from './sqs/sqs';
import moment = require('moment');
import { ibotta_pb as ib_content } from '@ibotta/pbjs-ib_content';
import { ibotta_pb as ib_core } from '@ibotta/pbjs-ib_core';

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

  const message = new ib_content.sponsored_offers.SponsoredOfferUpdated({
    eventHeader: createTriggerEventHeader(false),
    id: '234',
    campaignId: '123',
    categoryId: '345',
    startDate: toTimestamp(moment.now()),
    endDate: toTimestamp(moment.now()),
    position: 7,
    completedAt: toTimestamp(moment.now()),
  });
  Sqs.sendMessage('http://localhost:4576/queue/test-queue', message);
};

function toTimestamp(millis: number): ib_core.commons.Timestamp {
  return new ib_core.commons.Timestamp({
    millis: millis,
  });
}

function createTriggerEventHeader(fake: boolean) {
  return new ib_content.system.EventHeader({
    eventUri: new ib_content.system.URI({
      dom: ib_content.system.URI.Domain.IB_SCH,
      type: 'ibotta_pb.braze.BrazeCampaignTrigger',
    }),
    eventAt: new ib_content.commons.Timestamp({
      millis: moment.now(),
    }),
    environment: getEnvironment(),
    fake,
  });
}

export function getEnvironment(): ib_content.system.Environment {
  switch (process.env.NODE_ENV) {
    case 'test':
      return ib_content.system.Environment.TEST;
    case 'development':
      return ib_content.system.Environment.DEV;
    case 'staging':
      return ib_content.system.Environment.STAGING;
    case 'production':
      return ib_content.system.Environment.PROD;
    default:
      return ib_content.system.Environment.UNKNOWN;
  }
}

export { handler };
