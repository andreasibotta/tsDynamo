'use strict';
import { SQSHandler, SQSEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { Store } from './ddb/store';
import { Sqs } from './sqs/sqs';
import moment = require('moment');
import { ibotta_pb as ib_content } from '@ibotta/pbjs-ib_content';
import { ibotta_pb as ib_core } from '@ibotta/pbjs-ib_core';
import { RewardUpdatedRecord } from './models/rewardUpdatedRecord';
import { SponsoredOfferUpdatedRecord } from './models/sponsoredOfferUpdatedRecord';

AWS.config.update({ region: 'REGION' });

const rewardUpdatedHandler: SQSHandler = async (event: SQSEvent) => {
  console.log('RewardUpdated!');
  const messageBody = event['Records'][0]['body'];
  const rewardUpdated = ib_content.rewards.RewardUpdated.fromObject(
    JSON.parse(messageBody)
  );

  const rewardId: string = rewardUpdated.rewardUri?.id!!;
  const rewardUpdatedRecords: RewardUpdatedRecord[] = [];
  rewardUpdated.reward?.rewardVariantUris?.forEach((variant) => {
    const variantId = variant.id!!;
    rewardUpdatedRecords.push(new RewardUpdatedRecord(rewardId, variantId));
  });

  await Store.putRewardUpdatedRecords(rewardUpdatedRecords);

  // let scanResult = await Store.scan();
  // console.log('Scan result: ', scanResult);
};

const sponsoredOfferUpdatedHandler: SQSHandler = async (event: SQSEvent) => {
  console.log('SponsoredOfferUpdated!');
  const messageBody = event['Records'][0]['body'];
  const sou = ib_content.sponsored_offers.SponsoredOfferUpdated.fromObject(
    JSON.parse(messageBody)
  );

  const souId: string = sou.id;
  const sponsoredOfferUpdatedRecords: SponsoredOfferUpdatedRecord[] = [];

  const rewardIds =
    sou.eventHeader?.environment === 0
      ? [{ id: '567' }, { id: '789' }]
      : [{ id: '432' }, { id: '543' }];

  rewardIds.forEach((reward) => {
    const rewardId = reward.id;
    sponsoredOfferUpdatedRecords.push(new SponsoredOfferUpdatedRecord(souId, rewardId, sou.startDate!!.millis as number, sou.endDate!!.millis as number));
  });

  await Store.putSponsoredOfferUpdatedRecords(sponsoredOfferUpdatedRecords);

  let scanResult = await Store.scan();
  console.log('Scan result: ', scanResult);
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

export { rewardUpdatedHandler, sponsoredOfferUpdatedHandler };
