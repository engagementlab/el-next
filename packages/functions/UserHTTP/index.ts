import * as df from 'durable-functions';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
// const { BlobServiceClient } = require('@azure/storage-blob');
const { Client } = require('pg');

const httpStart: AzureFunction = async function (
  context: Context,
  req: HttpRequest
) {
  const client = df.getClient(context);
  let body: URLSearchParams = null;
  try {
    body = new URLSearchParams(context.bindings.req.body);
  } catch (err) {
    context.done(`Invalid body`);
  }

  const pgClient = new Client({
    connectionString: process.env.DB_URI,
  });
  try {
    await pgClient.connect();
  } catch (e) {
    context.log(e);
    context.done(`Connect error: ${e.message}`);
  }

  // Store base64 img string for new user in temp DB due to body size limit in DF activity
  if (body.get('img')) {
    const text = 'INSERT INTO "Temp" (id, "data") VALUES ($1, $2)';
    const values = [
      body.get('name').toLocaleLowerCase().replace(/ /g, '-'),
      body.get('img'),
    ];
    await pgClient.query(text, values);
    await pgClient.end();

    body.delete('img');
  }

  const instanceId = await client.startNew(
    req.params.functionName,
    undefined,
    body.toString()
  );

  context.log(`Started orchestration with ID = '${instanceId}'.`);

  return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};

export default httpStart;
