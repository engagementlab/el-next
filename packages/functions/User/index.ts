import { AzureFunction, Context, HttpRequest } from '@azure/functions';
var cuid = require('cuid');

const { Client } = require('pg');

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  if (!req.body.name) {
    context.log(req.body);
    context.res = {
      status: 500,
      body: `Missing "name"`,
    };
    return;
  }

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

  /*   if (req.body) {
    const token = Math.floor(1000000 + Math.random() * 900000);
    const values = {
      id: cuid(),
      name: req.body.name,
      accessToken: token,
    };

    context.bindings.createUser = values;
    context.res = {
      body: req.body,
      mimetype: 'application/json',
      status: 201,
    };
  } else {
    context.res = {
      status: 400,
      body: 'Error reading request body',
    }; */
};

export default httpTrigger;
