import { AzureFunction, Context } from '@azure/functions';

import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
const { Readable } = require('stream');

const cuid = require('cuid');
const { Client } = require('pg');

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
  secure: true,
});

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
    try {
      // const response = await cloudinary.uploader.upload(
      //   body[4].data.toString(),
      //   {
      //     folder: 'tngvi',
      //   }
      // // );
      // context.log(
      //   context.bindingData.body.image
      //   //   // typeof body[4].data,
      //   //   // Object.keys(body[4].data.toString('base64'))
      // );
      // res.status(200).send(response);
      // await new Promise((resolve, reject) => {
      const response = await cloudinary.uploader.upload(
        context.bindingData.body.image,
        {
          folder: 'tngvi',
        }
      );
      context.log(response);
      // res.status(200).send(response);
      //   if (error) {
      //     context.log.error(error);
      //     return reject(error);
      //   }
      //   resolve(result);
      // });
      // Readable.from(context.bindingData.body.image).pipe(upload);
      // });
    } catch (err: any) {
      context.log.error(err);
      // res.status(500).send(err);
    }
    const personId = cuid();
    // const text =
    //   'INSERT INTO "Person" (id, "name", "title", "blurb", "remembrance") VALUES($1, $2, $3, $4, $5)';
    // const values = [
    //   personId,
    //   body[0].data.toString(),
    //   body[1].data.toString(),
    //   body[2].data.toString(),
    //   body[3].data.toString() ? body[3].data.toString() : '',
    // ];
    // await client.query(text, values);

    // const updateProfileText = 'UPDATE "User" SET "bioId" = $1 WHERE "id" = $2';
    // await client.query(updateProfileText, [
    //   personId,
    //   context.bindingData.body.userId,
    // ]);
    // await client.end();
  } catch (e) {
    context.log.error(`Query error: ${e.message}`);
    throw e;
  }
};

export default activityFunction;
