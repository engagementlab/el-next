/* eslint-disable import/no-anonymous-default-export */
require('dotenv').config();
// const fs = require('fs');
const axios = require('axios').default;
const _ = require('underscore');
let videoData = '';

import fs from 'fs';
import _ from 'lodash';
import recursiveReaddirFiles from 'recursive-readdir-files';
import yargs from 'yargs/yargs';

const argv = yargs(process.argv.slice(2))
  .options({
    app: {
      type: 'string',
    },
  })
  .demandOption('app', 'Argument --app is required.').argv;

const getData = async (apiPath) => {
  const response = await axios.get(
    `https://api.vimeo.com${
      apiPath || '/channels/1773240/videos?per_page=100'
    }`,
    {
      headers: {
        Authorization: `Bearer ${process.env.VIMEO_AUTH_TOKEN}`,
      },
    }
  );
  const resData = response.data;
};

module.exports = (async () => {
  const data = await getData();
})();
