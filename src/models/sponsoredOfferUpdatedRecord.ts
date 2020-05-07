import { ibotta_pb as ib_content } from '@ibotta/pbjs-ib_content';

import { REWARD_PREFIX } from './rewardUpdatedRecord';

export const SPONSORED_OFFER_UPDATED_RECORD = 'SPONSORED_OFFER_UPDATED_RECORD';
export const SPONSORED_OFFER_UPDATED_PREFIX = 'SOU#';

export class SponsoredOfferUpdatedRecord {
  constructor(
    public id: string,
    public rewardId: string,
    public startDate: number,
    public endDate: number
  ) {}

  public getObjectToStore() {
    return {
      pk: `${SPONSORED_OFFER_UPDATED_PREFIX}${this.id}`,
      sk: `${REWARD_PREFIX}${this.rewardId}`,
      gsi1pk: `${REWARD_PREFIX}${this.rewardId}`,
      gsi1sk: `${SPONSORED_OFFER_UPDATED_PREFIX}${this.id}`,
      type: SPONSORED_OFFER_UPDATED_RECORD,
      id: this.id,
      rewardId: this.rewardId,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}
