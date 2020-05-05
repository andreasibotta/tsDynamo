import { handler } from './index';
import {sqsEvent, testContext} from './mocks';

jest.mock('aws-sdk');

test('can run the handler without throwing', async () => {
  await handler(sqsEvent, testContext, () => console.log('something'));
});
