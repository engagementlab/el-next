import 'dotenv/config';
import {
  BaseKeystoneTypeInfo,
  DatabaseConfig,
  KeystoneConfig,
} from '@keystone-6/core/types';

import yargs from 'yargs/yargs';
import e from 'express';

import type { Request, Response } from 'express';
import { type Context } from '.keystone/types';

const argv: any = yargs(process.argv.slice(2)).options({
  app: {
    type: 'string',
  },
  port: {
    type: 'number',
  },
}).argv;

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

import { v2 as cloudinary } from 'cloudinary';

import { getStudios } from './routes/studios';
import _ from 'lodash';
import cors from 'cors';
import schema from './schema';

function withContext<
  F extends (req: Request, res: Response, context: Context) => void
>(commonContext: Context, f: F) {
  return async (req: Request, res: Response) => {
    return f(req, res, await commonContext.withRequest(req, res));
  };
}
const port = argv.port || 3000;

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
  secure: true,
});

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
  const routePrefix =
    process.env.PRODUCTION_MODE === 'true' ? `/${appName}` : '';

  const config: KeystoneConfig = {
    db: dbConfig,

    lists,

    server: {
      port,
      maxFileSize: 1024 * 1024 * 50,
      extendExpressApp: (app: e.Express, commonContext) => {
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

        // app.use(`${routePrefix}/rest`, async (req, res, next) => {
        //   (req as any).context = await createContext(req, res);
        //   next();
        // });

        app.get(
          `${routePrefix}/rest/studios`,
          withContext(commonContext as Context, getStudios)
        );
      },
    },
    ui: {
      basePath: `${
        process.env.PRODUCTION_MODE === 'true' ? '/' + appName : ''
      }`,
    },
    graphql: {
      path: `${routePrefix}/api/graphql`,
    },
  };
  return config;
};

export default (() => {
  let config = ksConfig(schema);
  return config;
})();
