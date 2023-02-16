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
};

let appNames = [];
let appPort = 3000;
let spawnIndex = 0;

const spawnBuild = () => {
  fs.writeFileSync(path.join(process.cwd(), '.app'), `${appNames[spawnIndex]}`);
  const schemaFixChild = spawn('yarn', ['keystone', 'postinstall', '--fix']);
  schemaFixChild.on('error', chunk => {
    console.error(chunk);
  });
  schemaFixChild.stderr.on('data', errout => {
    console.error(errout.toString());
  });
  schemaFixChild.stdout.setEncoding('utf8');
  schemaFixChild.stdout.on('data', data => {
    console.log(data.toString());
  });
  schemaFixChild.on('exit', (err, info) => {
    const child = spawn('npm', ['run', 'build', `--port=${appPort}`]);
    console.log(`Building ${appNames[spawnIndex]}`);
    child.stderr.pipe(process.stderr);
    child.on('error', chunk => {
      console.error(chunk);
    });
    child.stderr.on('data', errout => {
      console.error('ERROR', errout.toString());
    });
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', data => {
      console.log(data.toString());
    });
    child.on('exit', (err, info) => {
      console.log(err, info);
      fs.moveSync(cwd('.keystone/admin'), cwd(`.keystone/${appNames[spawnIndex]}/admin`));
      fs.moveSync(cwd('.keystone/config.js'), cwd(`.keystone/${appNames[spawnIndex]}/config.js`));
      fs.moveSync(cwd('node_modules/.prisma/client'), cwd(`.keystone/${appNames[spawnIndex]}/.prisma/client`));
      fs.unlink(path.join(process.cwd(), '.app'));
      pm2.connect(function (err) {
        if (err) {
          console.error(err);
          process.exit(2);
        }

        pm2.list((err, list) => {
          if (list.find(proc => proc.name === `cms-${appNames[spawnIndex]}`)) {
            pm2.restart(`cms-${appNames[spawnIndex]}`, (err, proc) => {
              pm2.disconnect();
              setTimeout(() => {
                spawnIndex++;
                appPort++;
                if (spawnIndex < appNames.length) spawnBuild();
              }, 2000);
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
              setTimeout(() => {
                spawnIndex++;
                appPort++;
                if (spawnIndex < appNames.length) spawnBuild();
              }, 2000);
            });
          }
        });
      });
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