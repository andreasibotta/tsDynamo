
export const REWARD_UPDATED_RECORD = 'REWARD_UPDATED_RECORD';
export const REWARD_PREFIX = 'REWARD#'
export const REWARD_VARIANT_PREFIX = "RV#"

export class RewardUpdatedRecord {
  constructor(public rewardId: string, public rewardVariantId: string) {}

  public getObjectToStore() {
    return {
      pk: `${REWARD_PREFIX}${this.rewardId}`,
      sk: `${REWARD_VARIANT_PREFIX}${this.rewardVariantId}`,
      gsi1pk: `${REWARD_PREFIX}${this.rewardId}`,
      gsi1sk: `${REWARD_VARIANT_PREFIX}${this.rewardVariantId}`,
      type:  REWARD_UPDATED_RECORD,
      rewardId: this.rewardId,
      rewardVariantId: this.rewardVariantId,
    };
  }
}
