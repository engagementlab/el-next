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

import { tngvi, sjm, elab } from './admin/schema';

type schemaIndexType = {
  [key: string]: object;
};
const schemaMap: schemaIndexType = {
  elab: elab,
  tngvi: tngvi,
  sjm: sjm,
};

const argv: any = yargs(process.argv.slice(2)).options({
  app: {
    type: 'string',
  },
  port: {
    type: 'number',
  },
}).argv;

const multer = require('multer');
const upload = multer({
  limits: {
    fieldSize: 1024 * 1024 * 50,
  },
});
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

        app.use('rest', async (req, res, next) => {
          (req as any).context = await createContext(req, res);
          next();
        });

        app.get('rest/news/:key?', getNews);

        app.get('media/videos', async (req, res, next) => {
          try {
            let videoData: {
              label: any;
              value: any;
              thumb: any;
              thumbSm: any;
            }[] = [];
            const getData = async (
              apiPath: string = '/channels/1773240/videos?per_page=100'
            ) => {
              const response = await axios.get(
                `https://api.vimeo.com${apiPath}`,
                {
                  headers: {
                    Authorization: `Bearer ${process.env.VIMEO_AUTH_TOKEN}`,
                  },
                }
              );
              const resData = response.data;
              let m = _.map(
                resData.data,
                (val: {
                  name: any;
                  player_embed_url: any;
                  pictures: { sizes: string | any[] };
                }) => {
                  return {
                    label: val.name,
                    value: val.player_embed_url,
                    thumb:
                      val.pictures.sizes[val.pictures.sizes.length - 1].link,
                    thumbSm: val.pictures.sizes[1].link,
                  };
                }
              );
              videoData = videoData.concat(videoData, m);

              if (resData.paging.next) getData(resData.paging.next);
              else {
                res.status(200).send(videoData);
              }
            };
            getData();
          } catch (err: any) {
            res.status(500).send(err.message);
          }
        });

        app.get(
          `/${
            process.env.PRODUCTION_MODE === 'true' ? appName + '/' : ''
          }media/get/:type`,
          async (req, res) => {
            try {
              cloudinary.api.sub_folders(
                appName || 'tngvi',
                { max_results: 100 },
                (e, foldersResponse) => {
                  cloudinary.api.resources(
                    {
                      prefix: appName || 'tngvi',
                      resource_type: 'image',
                      type: req.params.type,
                      max_results: 500,
                    },
                    (e, response) => {
                      const sorted = response.resources.sort(
                        (
                          a: {
                            created_at: number;
                          },
                          b: {
                            created_at: number;
                          }
                        ) => {
                          return (
                            new Date(b.created_at).getTime() -
                            new Date(a.created_at).getTime()
                          );
                        }
                      );

                      res.status(200).send({
                        folders: foldersResponse.folders,
                        imgs: sorted,
                      });
                    }
                  );
                }
              );
            } catch (err: any) {
              res.status(500).send(err);
            }
          }
        );

        app.get('media/delete', async (req, res) => {
          try {
            cloudinary.uploader.destroy(req.query.id as string, (e, response) =>
              res.status(200).send(response)
            );
          } catch (err: any) {
            res.status(500).send(err);
          }
        });

        app.post('media/upload', upload.none(), async (req, res) => {
          try {
            const response = await cloudinary.uploader.upload(req.body.img, {
              folder: appName || 'tngvi',
            });
            res.status(200).send(response);
          } catch (err: any) {
            console.error(err);
            res.status(500).send(err);
          }
        });

        app.get('/prod-deploy/:note?', async (req, res, next) => {
          try {
            // const response = await axios.post(
            //   process.env.DEPLOY_API_PATH as string,
            //   {
            //     repo: 'el-next',
            //     appName,
            //     storageAccount: appConfigMap[appName].storageAccount,
            //     apexUrl: appConfigMap[appName].apexUrl,
            //     userName: req.session.passport?.user.name.split(' ')[0],
            //     note: req.query.note,
            //   }
            // );
            // res.status(200).send(req.session);
          } catch (err: any) {
            res.status(500).send(err.message);
          }
        });
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

export default (() => {
  let config = ksConfig(schemaMap[appName]);

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
})();
