import { AzureFunction, Context } from '@azure/functions';

import { v2 as cloudinary } from 'cloudinary';
import cuid = require('cuid');

const { Client } = require('pg');

const activityFunction: AzureFunction = async function (context: Context) {
  let body: URLSearchParams = null;
  let imgResponse = null;
  try {
    body = new URLSearchParams(context.bindings.input);
  } catch (err) {
    context.done(`Invalid body`);
  }

  const client = new Client({
    connectionString: process.env.DB_URI,
  });
  await client.connect();

  const userId = body.get('name').toLocaleLowerCase().replace(/ /g, '-');
  const getImgDataText = `SELECT "data" FROM "DataTemp" WHERE "id" = '${userId}'`;

  // Retrieve base64 img string for new user from DB
  const imgDataResult = await client.query(getImgDataText);
  if (imgDataResult.rowCount === 1) {
    // Upload new img if found
    imgResponse = await cloudinary.uploader.upload(imgDataResult.rows[0].data, {
      folder: 'tngvi',
    });
  }

  try {
    const getBioIdText = 'SELECT "bioId" FROM "User" WHERE "accessToken" = $1';
    const bioIdResult = await client.query(getBioIdText, [body.get('token')]);
    if (bioIdResult.rowCount === 0) {
      context.done('User not found');
      return 'User not found';
    }

    const updateProfileText = `UPDATE "Person" SET "name" = $1, "title" = $2, "blurb" = $3, "remembrance" = $4${
      imgResponse ? ', "image" = $5' : ''
    } WHERE "id" = '${bioIdResult.rows[0].bioId}'`;
    const values: any[] = [
      body.get('name'),
      body.get('title'),
      body.get('blurb'),
      body.get('remembrance') ? body.get('remembrance') : '',
    ];
    if (imgResponse) values.push({ id: cuid(), _meta: imgResponse });

    await client.query(updateProfileText, values);

    if (imgDataResult.rowCount === 1) {
      const delImgDataText = `DELETE FROM "DataTemp" WHERE "id" = '${userId}'`;
      const delResult = await client.query(delImgDataText);

      if (delResult.rowCount === 0) {
        context.done('Could not delete temporary image data.');
        return 'Could not delete temporary image data.';
      }
    }

    await client.end();
    return 'done';
  } catch (e) {
    context.log.error(`Query error: ${e.message}`);
    throw e;
  }
};

export default activityFunction;
