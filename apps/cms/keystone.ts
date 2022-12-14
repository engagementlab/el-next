import { BaseKeystoneTypeInfo, DatabaseConfig } from '@keystone-6/core/types';
import axios from 'axios';

import yargs from 'yargs/yargs';

import 'dotenv/config';
import e from 'express';
import session from 'express-session';

import { v2 as cloudinary } from 'cloudinary';

import { tngvi, sjm, elab } from './admin/schema';
import { getNews } from './routes/news';
import _ from 'lodash';

type schemaIndexType = {
  [key: string]: object;
};
type authCallbackIndexType = {
  [key: string]: string;
};

const argv: any = yargs(process.argv.slice(2)).options({
  app: {
    type: 'string',
  },
  port: {
    type: 'number',
  },
}).argv;

const schemaMap: schemaIndexType = {
  // elab: elab,
  tngvi: tngvi,
  sjm: sjm,
  elab: elab,
};

const authCallbackMap: authCallbackIndexType = {
  tngvi: 'https://cms.qa.transformnarratives.org/cms/callback',
  sjm: 'https://qa.sjmsymposium.org/cms/callback',
};

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

const fs = require('fs-extra');
const passport = require('passport');
const AuthStrategy = require('passport-google-oauth20').Strategy;
const MongoStore = require('connect-mongo')(session);
const DB = require('./db');

let appName: string = argv.app || 'tngvi';
if (fs.existsSync('.app')) {
  appName = fs.readFileSync('.app');
  console.log('Found app name: ' + appName);
}

declare module 'express-serve-static-core' {
  interface Request {
    logIn: any;
  }
}

declare module 'express-session' {
  export interface SessionData {
    redirectTo: string;
    save: any;
    passport: {
      redirectTo: string;
      user: {
        [key: string]: any;
      };
    };
  }
}
// const ciMode = process.env.NODE_ENV === 'ci';

// Fallback
let dbConfig: DatabaseConfig<BaseKeystoneTypeInfo> = {
  provider: 'sqlite',
  url: 'file:./app.db',
};
if (process.env.DB_URI) {
  dbConfig = {
    provider: 'postgresql',
    url: `${process.env.DB_URI}/${appName}`,
  };
}

const Passport = () => {
  let authCallbackUrl = `http://localhost:${port}/cms/callback`;
  if (process.env.NODE_ENV === 'production')
    authCallbackUrl = authCallbackMap[appName];

  const strategy = new AuthStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: authCallbackUrl,
    },
    (
      request: any,
      _accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) => {
      // Verify user allowed
      const email = profile.emails[0].value;

      try {
        DB().userModel.findOne(
          {
            email,
          },
          (err: any, user: any) => {
            if (err) {
              console.error(`Login error: ${err}`);
              return done(err);
            }
            if (!user) {
              console.error(
                `Login error: user not found for email ${profile.emails[0].value}`
              );
              return done(err);
            }
            return done(err, user);
          }
        );
      } catch (err) {
        throw new Error(err as string);
      }
    }
  );
  /**
   * Google oauth2/passport config
   */
  passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
    // console.log('user', user);
    done(null, user);
  });
  passport.deserializeUser(
    (user: any, done: (arg0: null, arg1: any) => void) => {
      // console.log('de', user);
      done(null, user);
    }
  );

  passport.use(strategy);

  return passport;
};

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

        app.use('/rest', async (req, res, next) => {
          (req as any).context = await createContext(req, res);
          next();
        });

        app.get('/rest/news/:key?', getNews);

        app.get('/prod-deploy', async (req, res, next) => {
          try {
            const response = await axios.get(
              `${process.env.DEPLOY_API_PATH}&name=transform-narratives`
            );
            res.status(200).send(response.data);
          } catch (err: any) {
            res.status(500).send(err.message);
          }
        });

        app.get('/media/videos', async (req, res, next) => {
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

        app.get('/media/get/:type', async (req, res) => {
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
        });

        app.get('/media/delete', async (req, res) => {
          try {
            cloudinary.uploader.destroy(req.query.id as string, (e, response) =>
              res.status(200).send(response)
            );
          } catch (err: any) {
            res.status(500).send(err);
          }
        });

        app.post('/media/upload', upload.none(), async (req, res) => {
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

        if (process.env.ENABLE_AUTH === 'true') {
          let p = Passport();
          // Session store (mongostore for prod)
          if (process.env.NODE_ENV === 'development') {
            app.use(
              session({
                secret: process.env.SESSION_COOKIE || 'just-dev',
                resave: true,
                saveUninitialized: true,
              })
            );
          } else {
            const mongooseConnection = DB().connection;
            if (!process.env.SESSION_COOKIE) {
              throw new Error('Need SESSION_COOKIE in .env!');
            }
            app.use(
              session({
                saveUninitialized: false,
                resave: false,
                secret: process.env.SESSION_COOKIE,
                store: new MongoStore({
                  mongooseConnection,
                }),
              })
            );
          }
          app.get(
            '/cms/login',
            p.authenticate('google', {
              scope: ['openid', 'email'],
            })
          );

          app.get('/cms/callback', (req, res, next) => {
            try {
              p.authenticate(
                'google',
                (
                  error: any,
                  user: {
                    permissions: any;
                  },
                  info: any
                ) => {
                  if (!user) return;

                  // Log user in
                  req.logIn(user, (logInErr: any) => {
                    if (logInErr) {
                      res.status(500).send(logInErr);
                      return logInErr;
                    }

                    // Explicitly save the session before redirecting!
                    req.session.save(() => {
                      res.redirect(req.session.redirectTo || '/');
                    });
                    return null;
                  });
                }
              )(req, res);
            } catch (e: any) {
              if (e) throw new Error(e);
            }
          });

          app.use(p.initialize());
          app.use(p.session());
          app.use((req, res, next) => {
            // Ignore API paths
            if (
              req.path.indexOf('/api') === 0 ||
              req.path.indexOf('/_next') === 0
            )
              next();
            else if (!req.session.passport || !req.session.passport.user) {
              // console.log(req.session.redirectTo);
              // Cache URL to bring user to after auth
              req.session.redirectTo = req.originalUrl;
              // if (req.session.redirectTo) res.redirect(req.session.redirectTo);
              // else {
              res.redirect('/cms/login');
              // }
            } else if (
              req.session.passport &&
              req.session.passport.user.isAdmin
            )
              next();
          });
        }
      },
    },
  };
};

export default (() => {
  return ksConfig(schemaMap[appName]);
})();
