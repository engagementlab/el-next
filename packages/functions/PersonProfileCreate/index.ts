import { AzureFunction, Context } from '@azure/functions';

import { v2 as cloudinary } from 'cloudinary';

const cuid = require('cuid');
const { Client } = require('pg');

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
  secure: true,
});

const activityFunction: AzureFunction = async function (context: Context) {
  const body = new URLSearchParams(context.bindings.body.input);

  const client = new Client({
    connectionString: process.env.DB_URI,
  });
  await client.connect();

  const userId = body.get('name').toLocaleLowerCase().replace(/ /g, '-');
  const getImgDataText = `SELECT "data" FROM "Temp" WHERE "id" = '${userId}'`;

  // Retrieve base64 img string for new user from DB
  const imgDataResult = await client.query(getImgDataText);
  if (imgDataResult.rowCount === 0) {
    context.done('Image data not found');
    return 'Image data not found';
  }

  try {
    const response = await cloudinary.uploader.upload(
      imgDataResult.rows[0].data,
      {
        folder: 'tngvi',
      }
    );

    const personId = cuid();
    const text =
      'INSERT INTO "Person" (id, "name", "image", "title", "blurb", "remembrance", "createdDate", "enabled") VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [
      personId,
      body.get('name'),
      response,
      body.get('title'),
      body.get('blurb'),
      body.get('remembrance') ? body.get('remembrance') : '',
      new Date(),
      'FALSE',
    ];
    await client.query(text, values);

    const updateProfileText = 'UPDATE "User" SET "bioId" = $1 WHERE "id" = $2';
    await client.query(updateProfileText, [
      personId,
      context.bindingData.body.userId,
    ]);

    const delImgDataText = `DELETE FROM "Temp" WHERE "id" = '${userId}'`;
    const delResult = await client.query(delImgDataText);

    if (delResult.rowCount === 0) {
      context.done('Could not delete temporary image data.');
      return 'Could not delete temporary image data.';
    }

    await client.end();
  } catch (e) {
    context.log.error(`Query error: ${e.message}`);
    throw e;
  }
};

export default activityFunction;
