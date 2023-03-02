import express, { Express, Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import _ from 'lodash';

dotenv.config();

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
  secure: true,
});

const app: Express = express();
const port = process.env.PORT || 3000;

const upload = multer({
  limits: {
    fieldSize: 1024 * 1024 * 50,
  },
});

app.use(cors({ credentials: true }));
app.enable('trust proxy');

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD, PUT');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method'
  );

  if (req.method === 'OPTIONS') res.send(200);
  else next();
});

/* 
app.use('rest', async (req, res, next) => {
  (req as any).context = await createContext(req, res);
  next();
});

app.get('rest/news/:key?', getNews); */

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
      const response = await axios.get(`https://api.vimeo.com${apiPath}`, {
        headers: {
          Authorization: `Bearer ${process.env.VIMEO_AUTH_TOKEN}`,
        },
      });
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
            thumb: val.pictures.sizes[val.pictures.sizes.length - 1].link,
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

app.get(`/media/get/:app/:type`, async (req, res) => {
  const appName = req.params.app;
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

app.post('media/upload', upload.none(), async (req, res) => {
  try {
    const response = await cloudinary.uploader.upload(req.body.img, {
      folder: req.body.app || 'tngvi',
    });
    res.status(200).send(response);
  } catch (err: any) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get('/prod-deploy/:app/:note?', async (req, res, next) => {
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

    res.status(200).send(req);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

/* */
app.listen(port, () => {
  console.log(`⚡️[api]: API is running at :${port}`);
});
