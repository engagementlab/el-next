"use strict";

/**
 * @el-next CMS
 * Developed by Engagement Lab, 2022
 *
 * @author Johnny Richardson
 * CMS production instance builder
 * ==========
 */
const fs = require('fs-extra');

const path = require('path');

const {
  spawn
} = require('child_process');

const pm2 = require('pm2');

const cwd = file => {
  return path.join(process.cwd(), file);
}; // const colors = require('colors');
// const glob = require('glob');


let appNames = [];
let appPort = 3000;
let spawnIndex = 0;

const spawnBuild = () => {
  const schemaFixChild = spawn('npm', ['run', 'postinstall']);
  schemaFixChild.on('error', chunk => {
    console.error(chunk);
  });
  schemaFixChild.stderr.on('data', errout => {
    console.error(errout.toString());
  });
  schemaFixChild.on('exit', (err, info) => {
    const child = spawn('npm', ['run', 'build', `--port=${appPort}`]);
    console.log(`Building ${appNames[spawnIndex]}`);
    child.stderr.pipe(process.stderr);
    child.on('error', chunk => {
      console.error(chunk);
    });
    child.stderr.on('data', errout => {
      console.error(errout.toString());
    });
    child.on('exit', (err, info) => {
      console.log(err, info);
      fs.move(cwd('.keystone/admin'), cwd(`.keystone/${appNames[spawnIndex]}`));
      pm2.connect(function (err) {
        if (err) {
          console.error(err);
          process.exit(2);
        }

        pm2.list((err, list) => {
          // console.log(err, list);
          if (list.find(proc => proc.name === `cms-${appNames[spawnIndex]}`)) {
            pm2.restart(`cms-${appNames[spawnIndex]}`, (err, proc) => {
              pm2.disconnect();
            });
          } else {
            pm2.start({
              script: cwd('/export/lib/start.js'),
              name: `cms-${appNames[spawnIndex]}`,
              args: `--app=${appNames[spawnIndex]} --port=${appPort}`
            }, function (err, apps) {
              if (err) {
                console.error(err);
              }

              pm2.disconnect();
            });
          }
        });
      });
      spawnIndex++;
      appPort++;
      if (spawnIndex < appNames.length) spawnBuild();
    });
  });
};

(async () => {
  // Remove output dirs
  fs.rmSync(path.join(process.cwd(), '/.keystone'), {
    recursive: true,
    force: true
  }); // Get all current CMS schemas from '../admin'

  const schemasDir = cwd('/admin/schema');
  const schemaItems = await fs.readdir(schemasDir);
  const schemaDirs = schemaItems.filter(schemaItem => {
    return fs.statSync(`${schemasDir}/${schemaItem}`).isDirectory();
  });
  appNames = schemaDirs;
  spawnBuild();
})();