import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const { Client } = require('pg');

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  //   const body = req.query
  if (!req.query.token) {
    context.res = {
      status: 500,
      body: 'token',
    };
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
    const bioIdResult = await client.query(getBioIdText, [req.query.token]);
    if (bioIdResult.rowCount === 0) {
      context.res = {
        status: 204,
      };
      return;
    }
    const getProfileText = `SELECT "name", "title", "blurb", "remembrance", "image" FROM "Person" WHERE "id" = '${bioIdResult.rows[0].bioId}'`;
    const profileResult = await client.query(getProfileText);
    await client.end();

    context.res = {
      status: 200,
      body: profileResult.rows[0],
    };
  } catch (e) {
    context.log.error(`Query error: ${e.message}`);
    throw e;
  }
};

export default httpTrigger;
