import { Context, SQSEvent ,SQSRecord,SQSRecordAttributes ,SQSMessageAttributes,SQSMessageAttribute} from 'aws-lambda';


const recordAttribute: SQSRecordAttributes = {
    AWSTraceHeader: 'trace',
    ApproximateReceiveCount: 'count',
    SentTimestamp: 'time',
    SenderId: 'sender',
    ApproximateFirstReceiveTimestamp: 'timestamp'
  }
  
  const messageAttribute: SQSMessageAttribute = {
    stringValue: 'string',
    binaryValue: 'true',
    stringListValues: [] as never[],
    binaryListValues: [] as never[],
    dataType: 'type'
  }
  const messageAttributes: SQSMessageAttributes = {
    'hello': messageAttribute
  }
  
  export const testContext: Context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: 'test',
    functionVersion: 'version zero',
    invokedFunctionArn: 'this:is:a:test',
    memoryLimitInMB: '128',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis: () => 10,
    done: () => {},
    fail: () => {},
    succeed: () => {},
  };

  const sqsRecord: ((body: string) => SQSRecord) = (body: string) => {return {
    messageId: 'some-id',
    receiptHandle: 'some-handle',
    body: body,
    attributes: recordAttribute,
    messageAttributes: messageAttributes,
    md5OfBody: 'hash',
    eventSource: 'some-source',
    eventSourceARN: 'some-arn',
    awsRegion: 'some-region'
  }};
  
  const rewardUpdatedJson = '{"reward":{"rewardUri":{"dom":"IB_MON","type":"OfferGroup","id":"148740"},"rewardType":"REWARD_TYPE_OFFER","campaignId":"62709","availability":\
  {"lastRedeemableAt":{"millis":"1589439540000"},"hardStopAt":{"millis":"1589439540000"},"startAt":{"millis":"1588316340000"},\
  "lastDiscoverableAt":{"millis":"1589439540000"},"launched":true},"displayInfo":{"imageUrlLarge":"https://product-images.ibotta.com/offer/maPYu5JfIbyRFz12NWmuPw-large.png",\
  "name":"Gain Fireworks Scent Booster","imageUrlThumbnail":"https://product-images.ibotta.com/offer/thumbnail/maPYu5JfIbyRFz12NWmuPw.png",\
  "imageUrl":"https://product-images.ibotta.com/offer/maPYu5JfIbyRFz12NWmuPw-normal.png","internalName":"Gain Fireworks Scent Booster 20.1 oz",\
  "terms":"Offer valid on Gain Fireworks Scent Booster for any variety, 20.1 oz.","descriptionTemplate":"any variety, 20.1 oz"},\
  "redemptionParameters":{"unlockRequired":true,"maxCompletionsPerTransaction":1},"offerInfo":{"offerCategories":[{"dom":"IB_MON","type":"Category","id":"10"}],\
  "offerType":"OFFER_TYPE_DEFAULT"},"rewardVariantUris":[{"dom":"IB_MON","type":"Offer","id":"123b"},{"dom":"IB_MON","type":"Offer","id":"506755"}]},"eventHeader":{"eventUri":{"dom":"IB_SCH","type":"ibotta_pb.rewards.RewardUpdated",\
  "id":"e1ba4db8-b2e9-4635-9f04-d58f6a37b4b9"},"eventAt":{"millis":"1588773975574"},"environment":"PROD","agent":"Ibotta_Monolith","host":"work-budget-0320c4733a4c523b5","revision":"1f3bfe9"},\
  "rewardUri":{"dom":"IB_MON","type":"OfferGroup","id":"148740"},"updatedAt":{"millis":"1588264776000"}}'

  export const rewardUpdatedSqsEvent: SQSEvent = {
    Records: [
      sqsRecord(rewardUpdatedJson)
    ]
  };

  const sponsoredOfferUpdatedJson1 = '{"eventHeader": {"eventUri": {"dom": 0,"type": "ibotta_pb.sponsored_offers.Updated.SponsoredOfferUpdated","id": "xx96cad0-b2d9-4b3f-a6f4-9f40fee7c246"},"eventAt": {\
        "millis": 1577963470000},"environment": 0,"agent": "","host": "","revision": "","fake": false,"priority": 0},\
    "id": "321","campaignId": "789","categoryId": "3","startDate": {"millis": 1577869868000},"endDate": {"millis": 1577963465000},"position": 1,"completedAt": {"millis": 1577963465000}}'

  export const sponsoredOfferUpdatedSqsEvent1: SQSEvent = {
    Records: [
      sqsRecord(sponsoredOfferUpdatedJson1)
    ]
  };

  const sponsoredOfferUpdatedJson2 = '{"eventHeader": {"eventUri": {"dom": 0,"type": "ibotta_pb.sponsored_offers.Updated.SponsoredOfferUpdated","id": "xx96cad0-b2d9-4b3f-a6f4-9f40fee7c246"},"eventAt": {\
    "millis": 1577963470000},"environment": 1,"agent": "","host": "","revision": "","fake": false,"priority": 0},\
"id": "321","campaignId": "789","categoryId": "3","startDate": {"millis": 1577869868000},"endDate": {"millis": 1577963465000},"position": 1,"completedAt": {"millis": 1577963465000}}'

export const sponsoredOfferUpdatedSqsEvent2: SQSEvent = {
Records: [
  sqsRecord(sponsoredOfferUpdatedJson2)
]
};

  export const offerViewedSqsEvent: SQSEvent = {
    Records: [
      sqsRecord('hello')
    ]
  };
  