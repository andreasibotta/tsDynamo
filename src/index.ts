'use strict';
import { SQSHandler, SQSEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { Store } from './ddb/store';
import { Sqs } from './sqs/sqs';
import moment = require('moment');
import { ibotta_pb as ib_content } from '@ibotta/pbjs-ib_content';
import { ibotta_pb as ib_core } from '@ibotta/pbjs-ib_core';
import { RewardUpdatedRecord } from './models/rewardUpdatedRecord';

AWS.config.update({ region: 'REGION' });

const rewardUpdatedHandler: SQSHandler = async (event: SQSEvent) => {
  console.log('RewardUpdated!');
  const messageBody = event['Records'][0]['body'];
  const rewardUpdated = ib_content.rewards.RewardUpdated.fromObject(
    JSON.parse(messageBody)
  );
  // console.log('rewardUpdated', rewardUpdated);
  // console.log('rewardVariantUris', rewardUpdated.reward?.rewardVariantUris);

  if (typeof rewardUpdated.rewardUri?.id !== 'string') {
    console.error('No id for incoming RewardUpdated');
    return;
  }

  const rewardId: string = rewardUpdated.rewardUri?.id;
  const rewardUpdatedRecords: RewardUpdatedRecord[] = [];
  rewardUpdated.reward?.rewardVariantUris?.forEach((variant) => {
    if (typeof variant.id !== 'string') {
      console.error('No id for incoming RewardUpdated');
      return;
    }

    const variantId = variant.id;
    rewardUpdatedRecords.push(new RewardUpdatedRecord(rewardId, variantId));
  });

  console.log('rewardUpdatedRecords', rewardUpdatedRecords);

  Store.putRewardUpdatedRecords(rewardUpdatedRecords);

  let scanResult = await Store.scan();
  console.log('Scan result: ', scanResult);

  // const putResult = await SongStore.putSong(imagine);
  // console.log('Put result: ', putResult);

  // const getResult = await SongStore.getSong(songKey);
  // console.log('Get result: ', getResult);

  // scanResult = await SongStore.scan();
  // console.log('Scan result: ', scanResult);

  // const message = new ib_content.sponsored_offers.SponsoredOfferUpdated({
  //   eventHeader: createTriggerEventHeader(false),
  //   id: '234',
  //   campaignId: '123',
  //   categoryId: '345',
  //   startDate: toTimestamp(moment.now()),
  //   endDate: toTimestamp(moment.now()),
  //   position: 7,
  //   completedAt: toTimestamp(moment.now()),
  // });
  // Sqs.sendMessage('http://localhost:4576/queue/test-queue', message);
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

export { rewardUpdatedHandler };
