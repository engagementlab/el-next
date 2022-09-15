import { AzureFunction, Context } from '@azure/functions';

import { v2 as cloudinary } from 'cloudinary';

const { Client } = require('pg');

const activityFunction: AzureFunction = async function (context: Context) {
  let body: URLSearchParams = null;
  let imgResponse = null;
  try {
    body = new URLSearchParams(context.bindings.input.body);
  } catch (err) {
    context.done(`Invalid body`);
  }

  if (body.has('img')) {
    imgResponse = await cloudinary.uploader.upload(body.get('img'), {
      folder: 'tngvi',
    });
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
    context.log(getBioIdText);
    const bioIdResult = await client.query(getBioIdText, [body.get('token')]);
    if (bioIdResult.rowCount === 0) {
      context.done('User not found');
      return 'User not found';
    }

    const updateProfileText = `UPDATE "Person" SET "name" = $1, "title" = $2, "blurb" = $3, "remembrance" = $4${
      imgResponse ? ', "image" = $5' : ''
    } WHERE "id" = '${bioIdResult.rows[0].bioId}'`;
    context.log(updateProfileText);
    const values = [
      body.get('name'),
      body.get('title'),
      body.get('blurb'),
      body.get('remembrance') ? body.get('remembrance') : '',
    ];
    if (imgResponse) values.push(imgResponse);

    await client.query(updateProfileText, values);
    await client.end();
    return 'done';
  } catch (e) {
    context.log.error(`Query error: ${e.message}`);
    throw e;
  }
};

export default activityFunction;
