import 'source-map-support/register';
import { SQSHandler } from 'aws-lambda';

const handler: SQSHandler = async event => {
  console.log('hello world!');
  console.log(JSON.stringify(event));
};

export { handler };