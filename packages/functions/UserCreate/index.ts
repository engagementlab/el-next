/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 *
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

import { AzureFunction, Context } from '@azure/functions';

import cuid = require('cuid');
import { Client } from 'pg';
import * as multipart from 'parse-multipart-data';

const activityFunction: AzureFunction = async function (context: Context) {
  const bodyBuffer = Buffer.from(context.bindings.req.rawBody);
  const boundary = multipart.getBoundary(
    context.bindings.req.headers['content-type']
  );
  const parts = multipart.parse(bodyBuffer, boundary);
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    context.log(part);
    // will be: { filename: 'A.txt', type: 'text/plain', data: <Buffer 41 41 41 41 42 42 42 42> }
  }
  if (parts.length === 0) {
    context.done(`Missing body`);
  }

  const client = new Client({
    connectionString: process.env.DB_URI,
  });
  try {
    await client.connect();
  } catch (e) {
    context.log(e);
    context.done(`Connect error: ${e.message}`);
  }
  try {
    const userId = cuid();
    const token = Math.floor(100000 + Math.random() * 90000);
    const text =
      'INSERT INTO "User"(id, "name", "accessToken", "createdDate") VALUES($1, $2, $3, $4)';
    const values = [userId, parts[0].data.toString(), token, new Date()];
    await client.query(text, values);
    await client.end();
    // context.done(null, { token });

    return { body: parts, userId, token };
  } catch (e) {
    context.log.error(`Query error: ${e.message}`);
    throw e;
  }
};

export default activityFunction;
