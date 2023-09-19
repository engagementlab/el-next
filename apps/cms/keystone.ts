import {
  BaseKeystoneTypeInfo,
  DatabaseConfig,
  KeystoneConfig,
} from '@keystone-6/core/types';
import axios from 'axios';

import yargs from 'yargs/yargs';

import 'dotenv/config';
import e from 'express';

import { v2 as cloudinary } from 'cloudinary';

import { getNews } from './routes/news';
import _ from 'lodash';
import cors from 'cors';
// import CreateSchema from './admin/schema';
import fs = require('fs');

// type schemaIndexType = {
//   [key: string]: object;
// };
// const schemaMap: schemaIndexType = {
//   elab: elabSchema,
//   sjm: sjmSchema,
//   // tngvi: tngvi,
// };

const argv: any = yargs(process.argv.slice(2)).options({
  app: {
    type: 'string',
  },
  port: {
    type: 'number',
  },
}).argv;

const port = argv.port || 3000;

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
  secure: true,
});

let appName: string = '';
// --app takes precedence over environment variables
if (argv.app) appName = argv.app;
else {
  if (process.env.APP_NAME) appName = process.env.APP_NAME;
  else if (process.env.APP) appName = process.env.APP;
}

if (appName === undefined || appName.length === 0)
  throw new Error(
    '--app argument or "APP" / "APP_NAME" env var must be specified'
  );

console.log('Found app name: ' + appName);

declare module 'express-serve-static-core' {
  interface Request {
    logIn: any;
  }
}

const devMode = process.env.NODE_ENV === 'development';

// Fallback
let dbConfig: DatabaseConfig<BaseKeystoneTypeInfo> = {
  provider: 'sqlite',
  url: 'file:./app.db',
};
if (process.env.DB_URI) {
  dbConfig = {
    provider: 'postgresql',
    url: `${process.env.DB_URI}/${appName}${
      !devMode ? '?sslmode=require' : ''
    }`,
  };
}

let ksConfig = (lists: any) => {
  return {
    db: dbConfig,

    experimental: {
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },

    lists,

    server: {
      port,
      maxFileSize: 1024 * 1024 * 50,
      extendExpressApp: (app: e.Express, createContext: any) => {
        app.use(cors({ credentials: true }));
        app.enable('trust proxy');

        app.all('/*', (req, res, next) => {
          res.header('Access-Control-Allow-Origin', '*');
          // res.header('Access-Control-Allow-Credentials', true)
          res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, HEAD, PUT'
          );
          res.header('Access-Control-Expose-Headers', 'Content-Length');
          res.header(
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method'
          );

          if (req.method === 'OPTIONS') res.send(200);
          else next();
        });

        app.use(
          `/${process.env.PRODUCTION_MODE === 'true' ? appName + '/' : ''}rest`,
          async (req, res, next) => {
            (req as any).context = await createContext(req, res);
            next();
          }
        );

        app.get(
          `/${
            process.env.PRODUCTION_MODE === 'true' ? appName + '/' : ''
          }rest/news/:key?`,
          getNews
        );
      },
    },
    ui: {},
    graphql: {
      path: `/${
        process.env.PRODUCTION_MODE === 'true' ? appName + '/' : ''
      }api/graphql`,
    },
  };
};

import * as schema from './admin/schema';
export default (() => {
  // console.log(CreateSchema);

  // fs.readdir('./database', (err, files) => {
  //  files.forEach(file => {

  let config = ksConfig(schema);

  if (process.env.PRODUCTION_MODE === 'true')
    config.ui = {
      getAdditionalFiles: [
        async (config: KeystoneConfig) => [
          {
            mode: 'write',
            src: `
            const keystoneConfig =
              require("@keystone-6/core/___internal-do-not-use-will-break-in-patch/admin-ui/next-config").config;

            const config = {
              ...keystoneConfig,
              basePath: "/${appName}",
            };

            module.exports = config;
            `,
            outputPath: 'next.config.js',
          },
        ],
      ],
    };

  return config;
  // });
})();
