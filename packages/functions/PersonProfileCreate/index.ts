import { AzureFunction, Context } from '@azure/functions';

const cuid = require('cuid');
const { Client } = require('pg');

const activityFunction: AzureFunction = async function (context: Context) {
  const body = context.bindings.body.input;

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
    const personId = cuid();
    const text =
      'INSERT INTO "Person"(id, "name", "title", "blurb", "remembrance") VALUES($1, $2, $3, $4, $5)';
    const values = [
      personId,
      body[0].data.toString(),
      body[1].data.toString(),
      body[2].data.toString(),
      body[3].data.toString() ? body[3].data.toString() : '',
    ];
    await client.query(text, values);

    const updateProfileText = 'UPDATE "User" SET "bioId" = $1 WHERE "id" = $2';
    await client.query(updateProfileText, [
      personId,
      context.bindingData.body.userId,
    ]);
    await client.end();
  } catch (e) {
    context.log.error(`Query error: ${e.message}`);
    throw e;
  }
};

export default activityFunction;
