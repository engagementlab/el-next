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
  let body = null;
  try {
    body = new URLSearchParams(context.bindings.req.body);
  } catch (err) {
    context.done(`Invalid body`);
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
    const values = [userId, body.get('name'), token, new Date()];
    await client.query(text, values);
    await client.end();
    // // context.done(null, { token });

    return { body: body.toString(), userId, token };
  } catch (e) {
    context.log.error(`Query error: ${e.message}`);
    throw e;
  }
};

export default activityFunction;
