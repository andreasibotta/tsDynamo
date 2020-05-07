
import { ibotta_pb as ib_content } from '@ibotta/pbjs-ib_content';

import { REWARD_PREFIX } from "./rewardUpdatedRecord";

export const SPONSORED_OFFER_UPDATED_RECORD = 'SPONSORED_OFFER_UPDATED_RECORD';
export const SPONSORED_OFFER_UPDATED_PREFIX = "SOU#"

export class SponsoredOfferUpdatedRecord {
  public pk: string;
  public sk: string;
  public gsi1pk: string;
  public gsi1sk: string;
  public type: string;

  constructor(public id: string, public rewardId: string, public startDate: ib_content.commons.ITimestamp, public endDate: ib_content.commons.ITimestamp) {
    this.pk = `${SPONSORED_OFFER_UPDATED_PREFIX}${id}`;
    this.sk = `${REWARD_PREFIX}${rewardId}`;
    this.gsi1pk = `${REWARD_PREFIX}${rewardId}`;
    this.gsi1sk = `${SPONSORED_OFFER_UPDATED_PREFIX}${id}`;
    this.type = SPONSORED_OFFER_UPDATED_RECORD;
  }
}
