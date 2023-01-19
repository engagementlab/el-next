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

export default (async () => {
  const files = await recursiveReaddirFiles(
    `${process.cwd()}/apps/${argv.app}/out`,
    {
      ignored: /(\.js|.css|.json|.ico|.png|.DS_Store|favicon)$/,
      filter: (item) => {
        return item.path;
      },
    }
  );
  const urls = _.map(files, (file) => {
    return `"${file.path
      .replace(`${process.cwd()}/apps/${argv.app}/out`, 'http://localhost:8080')
      .replace('index.html', '')}"`;
  });

  if (fs.existsSync('.pa11yci')) fs.unlinkSync('.pa11yci');
  fs.writeFileSync('.pa11yci', `{"urls": [${urls}]}`);
})();
