﻿import { AzureFunction, Context } from '@azure/functions';

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

  // context.log(context.bindings.body.input, body);
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
    const response = await cloudinary.uploader.upload(body.get('img'), {
      folder: 'tngvi',
    });

    const personId = cuid();
    const text =
      'INSERT INTO "Person" (id, "name", "image", "title", "blurb", "remembrance", "createdDate") VALUES($1, $2, $3, $4, $5, $6, $7)';
    const values = [
      personId,
      body.get('name'),
      response,
      body.get('title'),
      body.get('blurb'),
      body.get('remembrance') ? body.get('remembrance') : '',
      new Date(),
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
