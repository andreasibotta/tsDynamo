
import {rewardUpdatedSqsEvent, testContext, sponsoredOfferUpdatedSqsEvent} from './mocks';
import { rewardUpdatedHandler,sponsoredOfferUpdatedHandler } from '../index';


rewardUpdatedHandler(rewardUpdatedSqsEvent, testContext, (a) => console.log(a));
sponsoredOfferUpdatedHandler(sponsoredOfferUpdatedSqsEvent, testContext, (a) => console.log(a));
