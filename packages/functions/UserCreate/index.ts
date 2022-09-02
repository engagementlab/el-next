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

const cuid = require('cuid');
const { Client } = require('pg');

const activityFunction: AzureFunction = async function (context: Context) {
  if (!context.bindings.body.name) {
    context.done(`Missing "name"`);
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
    const token = Math.floor(1000000 + Math.random() * 900000);
    const text =
      'INSERT INTO "User"(id, "name", "accessToken") VALUES($1, $2, $3)';
    const values = [userId, context.bindings.body.name, token];
    await client.query(text, values);
    await client.end();
    // context.done(null, { token });

    return { userId, token };
  } catch (e) {
    context.log.error(`Query error: ${e.message}`);
    throw e;
  }
};

export default activityFunction;
