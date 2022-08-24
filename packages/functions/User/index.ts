import { AzureFunction, Context, HttpRequest } from '@azure/functions';
var cuid = require('cuid');

const { Client } = require('pg');

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  // context.log('HTTP trigger function processed a request.');
  // const name = req.query.name || (req.body && req.body.name);
  // const responseMessage = name
  //   ? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
  //   : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';
  // context.res = {
  //   body: responseMessage,
  // };
  const client = new Client({
    connectionString: process.env.DB_URI,
  });
  try {
    await client.connect();
  } catch (e) {
    context.log(e);
    context.res = {
      status: 500,
      body: `Connect error: ${e.message}`,
    };
  }
  try {
    const token = Math.floor(1000000 + Math.random() * 900000);
    const text =
      'INSERT INTO "User"(id, "name", "accessToken") VALUES($1, $2, $3)';
    const values = [cuid(), req.body.name, token];
    const res = await client.query(text, values);
    await client.end();
    context.res = {
      body: res,
    };
  } catch (e) {
    context.log(e);
    context.res = {
      status: 500,
      body: `Query error: ${e.message}`,
    };
  }
};

export default httpTrigger;
