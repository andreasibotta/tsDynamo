
import {rewardUpdatedSqsEvent, testContext} from './mocks';
import { rewardUpdatedHandler } from '../index';


rewardUpdatedHandler(rewardUpdatedSqsEvent,testContext, (a) => console.log(a));
