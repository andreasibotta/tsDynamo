import {
  rewardUpdatedSqsEvent,
  testContext,
  sponsoredOfferUpdatedSqsEvent1,
  sponsoredOfferUpdatedSqsEvent2,
} from './mocks';
import { rewardUpdatedHandler, sponsoredOfferUpdatedHandler } from '../index';

sponsoredOfferUpdatedHandler(sponsoredOfferUpdatedSqsEvent1, testContext, (a) =>
  console.log(a)
);
rewardUpdatedHandler(rewardUpdatedSqsEvent, testContext, (a) => console.log(a));
sponsoredOfferUpdatedHandler(sponsoredOfferUpdatedSqsEvent2, testContext, (a) =>
  console.log(a)
);
