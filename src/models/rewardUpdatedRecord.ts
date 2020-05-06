
export const REWARD_UPDATED_RECORD = 'REWARD_UPDATED_RECORD';
export const REWARD_PREFIX = 'REWARD#'
export const REWARD_VARIANT_PREFIX = "RV#"

export class RewardUpdatedRecord {
  public pk: string;
  public sk: string;
  public gsi1pk: string;
  public gsi1sk: string;
  public type: string;

  constructor(public rewardId: string, public rewardVariantId: string) {
    this.pk = `${REWARD_PREFIX}${rewardId}`;
    this.sk = `${REWARD_VARIANT_PREFIX}${rewardVariantId}`;
    this.gsi1pk = `${REWARD_PREFIX}${rewardId}`;
    this.gsi1sk = `${REWARD_VARIANT_PREFIX}${rewardVariantId}`;
    this.type = REWARD_UPDATED_RECORD;
  }
}
