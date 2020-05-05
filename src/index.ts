'use strict';

import 'source-map-support/register';
import { SQSHandler } from 'aws-lambda';
import * as uuid from 'uuid';
import * as AWS from 'aws-sdk';
import { DynamoDB, Endpoint } from 'aws-sdk';
import { QueryOutput } from 'aws-sdk/clients/dynamodb';

AWS.config.update({ region: 'REGION' });

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  endpoint: 'http://localhost:4569',
});

var params = {
  TableName: 'testTable',
};

const handler: SQSHandler = async (event) => {
  console.log('hello world!');
  console.log(JSON.stringify(event));

  ddb.scan(params, function (err, data: QueryOutput) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.Items);
      data.Items?.forEach(function (element, index, array) {
        console.log(element.Artist.S + ' (' + element.SongTitle.S + ')');
      });
    }
  });
};

export { handler };


