import { AzureFunction, Context } from '@azure/functions';

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
    const getBioIdText = 'SELECT "bioId" FROM "User" WHERE "accessToken" = $1';
    const bioIdResult = await client.query(getBioIdText, [body.token]);
    if (bioIdResult.rowCount === 0) {
      context.done('User not found');
      return;
    }
    context.log(bioIdResult);
    const updateProfileText = `UPDATE "Person" SET "name" = $1 "title" = $2 "blurb" = $3 "remembrance" = $4 WHERE "id" = ${bioIdResult}`;
    await client.query(updateProfileText, [context.bindingData.body.userId]);
    const values = [
      body.name,
      body.title,
      body.blurb,
      body.remembrance ? body.remembrance : '',
    ];
    await client.query(updateProfileText, values);
    await client.end();
    // const text =
    //   'INSERT INTO "Person"(id, "name", "title", ) VALUES($1, $2, $3, $4, $5)';
  } catch (e) {
    context.log.error(`Query error: ${e.message}`);
    throw e;
  }
};

export default activityFunction;
