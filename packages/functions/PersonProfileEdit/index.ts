import { AzureFunction, Context } from '@azure/functions';

const cuid = require('cuid');
const { Client } = require('pg');

const activityFunction: AzureFunction = async function (context: Context) {
  const body = context.bindings.body;
  if (!body.name) {
    context.done(`Missing "name"`);
  } else if (!body.title) {
    context.done(`Missing "title"`);
  } else if (!body.blurb) {
    context.done(`Missing "blurb"`);
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
    const text =
      'UPDATE Person SET name = $1 title = $2 blurb = $3 remembrance = $4 WHERE id = $5';
    const values = [
      cuid(),
      body.name,
      body.title,
      body.blurb,
      body.remembrance ? body.remembrance : '',
    ];
    await client.query(text, values);
    await client.end();
  } catch (e) {
    context.log.error(`Query error: ${e.message}`);
    throw e;
  }
};

export default activityFunction;
