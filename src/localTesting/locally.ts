
import {sqsEvent, testContext} from './mocks';
import {handler } from '../index';


handler(sqsEvent,testContext, (a) => console.log(a));
