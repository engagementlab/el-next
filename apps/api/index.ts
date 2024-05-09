import express, { Express } from 'express';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { WebClient } from '@slack/web-api';
import { unfurl } from 'unfurl.js';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import _ from 'lodash';
import fileUpload from 'express-fileupload';

type Video = {
  name: any;
  player_embed_url: any;
  pictures: { sizes: string | any[] };
  files: any[];
  privacy: { view: string };
};

dotenv.config();

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
  secure: true,
});

const app: Express = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json({ limit: 1024 * 1024 * 100 }));

const port = process.env.PORT || 3000;
const devMode = process.env.NODE_ENV === 'development';

app.use(cors({ credentials: true }));
app.enable('trust proxy');

app.use(fileUpload());

axios.defaults.maxBodyLength = 1024 * 1024 * 100;

app.all('/*', (req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    `${devMode ? 'http://localhost:3000' : '*'}`
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD, PUT');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method'
  );

  if (req.method === 'OPTIONS') res.send(200);
  else next();
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
      apiPath: string = '/users/11255512/videos?sort=date&direction=desc&per_page=75'
    ) => {
      const response = await axios
        .get(`https://api.vimeo.com${apiPath}`, {
          headers: {
            Authorization: `Bearer ${process.env.VIMEO_AUTH_TOKEN}`,
          },
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
      if (!response) return;
      const resData = response.data;

      let m = _.map(
        resData.data.filter((d: Video) => d.privacy.view !== 'unlisted'),
        (val: Video) => {
          // if (val.privacy.view === 'unlisted') return;
          let fileInfo = val.files.find((file) => file.rendition === '1080p');
          // Fallback
          if (!fileInfo)
            fileInfo = val.files.find((file) => file.rendition === '720p');

          return {
            label: val.name,
            value: val.player_embed_url,
            thumb: val.pictures.sizes[val.pictures.sizes.length - 1].link,
            thumbSm: val.pictures.sizes[1].link,
            file: fileInfo ? fileInfo.link : undefined,
          };
        }
      );
      videoData = videoData.concat(videoData, m);

      // Limit to first 75 videos
      res.status(200).send(videoData);
    };
    getData();
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

app.get('/media/videos/data/:videoId?', async (req, res, next) => {
  if (!req.params.videoId) {
    res.status(500).send('No videoId provided.');
    return;
  }
  try {
    const response = await axios.get(
      `https://api.vimeo.com/videos/${req.params.videoId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.VIMEO_AUTH_TOKEN}`,
        },
      }
    );
    // Get path to 1080p mp4 file
    const resData = (response.data.files as any[]).find(
      (file) => file.rendition === '1080p'
    ).link;
    res.status(200).send(resData);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

app.get(`/media/get/:app/:type`, async (req, res) => {
  const appName = req.params.app;
  try {
    cloudinary.api.sub_folders(
      appName || 'elab-home-v3.x',
      { max_results: 100 },
      (e, foldersResponse) => {
        cloudinary.api.resources(
          {
            prefix: appName || 'elab-home-v3.x',
            resource_type: 'image',
            type: req.params.type,
            max_results: 500,
            context: true,
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
    cloudinary.uploader.destroy(
      req.query.id as string,
      { invalidate: true },
      (e, response) => {
        console.log(response, e);
        res.status(200).send(response);
      }
    );
  } catch (err: any) {
    res.status(500).send(err);
  }
});

app.post('/media/upload', async (req, res) => {
  try {
    let options: UploadApiOptions = {
      folder:
        req.body.folder !== 'undefined'
          ? req.body.folder
          : req.body.app || 'elab-home-v3.x',
      context: { alt: req.body.alt ? req.body.alt : '' },
    };
    if (req.body.overwrite === 'true' && req.body.public_id) {
      options.overwrite = true;
      options.invalidate = true;
      options.public_id = req.body.public_id.replace(
        req.body.app || 'elab-home-v3.x',
        ''
      );
    }

    const response = await cloudinary.uploader.upload(req.body.img, options);
    res.status(200).send(response);
  } catch (err: any) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post('/embed', async (req, res) => {
  if (!req.body) {
    res.status(500).send('No body provided in payload.');
    return;
  }
  const url = req.body.url;
  try {
    const oembed = await unfurl(url);

    res.status(200).send(oembed);
  } catch (err: any) {
    res.status(500).send(err);
  }
});

app.get('/media/update', (req, res) => {
  try {
    cloudinary.api.update(
      req.query.id as string,
      {
        resource_type: 'image',

        context: { alt: req.query.alt },
      },
      function (error, result) {
        if (error) res.status(500).send(error);
        res.status(200).send('ok');
      }
    );
  } catch (err: any) {
    res.status(500).send(err);
  }
});

app.get('/media/update/usage', async (req, res) => {
  try {
    await cloudinary.uploader.add_context(
      `doc_id_${req.query.doc_id}=${req.query.doc_name}`,
      [req.query.public_id as string]
    );

    res.status(200).send('ok');
  } catch (err: any) {
    res.status(500).send(err);
  }
});

app.post('/file/upload', async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(500).send('No body provided in payload.');
      return;
    }
    if (
      !req.files ||
      (!(req.files as unknown as fileUpload.FileArray).file as any).data
    ) {
      res.status(500).send('Invalid file.');
      return;
    }

    const form = new FormData();
    const file = new Blob([
      ((req.files as unknown as fileUpload.FileArray).file as any).data,
    ]);
    const fileName = (
      (req.files as unknown as fileUpload.FileArray).file as any
    ).name
      .toLocaleLowerCase()
      .replace(/\s+/gi, '-');
    form.append('file', file);

    const response = await fetch(
      `${process.env.UPLOAD_API_PATH as string}&name=${fileName}`,
      {
        method: 'POST',
        body: form,
      }
    );

    const result = await response.json();
    res.status(200).send(result);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.post('/prod-deploy', async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(500).send('No body provided in payload.');
      return;
    }
    // Get user's emerson.edu email address from forwardauth cookie
    const userEmail = req.headers.cookie?.match(
      /([a-zA-Z0-9._-]+@emerson.edu)/gi
    );
    const response = await axios.post(process.env.DEPLOY_API_PATH as string, {
      repo: 'el-next',
      appName: req.body.app,
      storageAccount: req.body.storageAccount,
      apexUrl: req.body.apexUrl,
      userName:
        userEmail && userEmail?.length !== -1
          ? userEmail[0]
          : 'engagementlab@emerson.edu',
      note: req.body.note,
      cdnName: req.body.cdnName ? req.body.cdnName : req.body.storageAccount,
    });

    res.status(200).send(response.data);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

app.get('/links/list', async (req, res) => {
  try {
    const response = await axios.post(process.env.LINKS_API_PATH as string, {
      action: 'list',
    });
    res.status(200).send(response.data);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

app.post('/link/create', async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(500).send('No body provided in payload.');
      return;
    }
    // Get user's emerson.edu email address from forwardauth cookie
    const userEmail = req.headers.cookie?.match(
      /([a-zA-Z0-9._-]+@emerson.edu)/gi
    );
    const response = await axios.post(process.env.LINKS_API_PATH as string, {
      action: 'create',
      userEmail:
        userEmail && userEmail?.length !== -1
          ? userEmail[0]
          : 'engagementlab@emerson.edu',
      ...req.body,
    });
    res.status(200).send(response.data);
  } catch (err: any) {
    res
      .status(500)
      .send({ status: err.response.status, info: err.response.data });
  }
});

app.post('/slack', async (req, res) => {
  if (!req.body) {
    res.status(500).send('No body provided in payload.');
    return;
  }
  try {
    const web = new WebClient(process.env.SLACK_TOKEN);
    let blocks = [
      { type: 'section', text: { type: 'mrkdwn', text: req.body.text } },
    ];

    if (req.body.message) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `> :postit: ${req.body.message}`,
        },
      });
    }

    await web.chat.postMessage({
      channel: req.body.channel,
      blocks,
      icon_emoji: ':building_construction:',
      username: 'Builds Helper',
    });

    res.status(200).send('ok');
  } catch (err: any) {
    res.status(500).send(err);
  }
});

/* */
app.listen(port, () => {
  console.log(`⚡️[api]: API is running at :${port}`);
});
