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
const { spawn, execSync } = require('child_process');
const pm2 = require('pm2');

const cwd = (file: string) => {
  return path.join(process.cwd(), file);
};

let appNames: string[] = [];
let appPort = 3000;
let spawnIndex = 0;

const spawnBuild = () => {
  const schemaFixChild = spawn('yarn', ['keystone', 'postinstall', '--fix'], {
    env: { ...process.env, APP: appNames[spawnIndex] },
  });
  schemaFixChild.on('error', (chunk: any) => {
    console.error(chunk);
  });
  schemaFixChild.stderr.on('data', (errout: { toString: () => any }) => {
    console.error(errout.toString());
  });
  schemaFixChild.stdout.setEncoding('utf8');
  schemaFixChild.stdout.on('data', (data: { toString: () => any }) => {
    console.log(data.toString());
  });
  schemaFixChild.on('exit', (err: any, info: any) => {
    // Run dev on unused port in order to safely apply prisma migration
    const devChild = spawn('yarn', ['dev', '--port', appPort * 2], {
      env: { ...process.env, APP: appNames[spawnIndex] },
    });
    devChild.on('error', (chunk: any) => {
      console.error(chunk);
    });
    devChild.stderr.on('data', (errout: { toString: () => any }) => {
      console.error(errout.toString());
    });
    devChild.stdout.setEncoding('utf8');
    devChild.stdout.on('data', (data: { toString: () => any }) => {
      if (data.toString().indexOf('Admin UI ready') > 0) {
        process.kill(devChild.pid, 9);
      }
    });
    devChild.on('exit', (err: any, info: any) => {
      const child = spawn('npm', ['run', 'build', `--port=${appPort}`], {
        env: { ...process.env, APP: appNames[spawnIndex] },
      });

      console.log(`Building ${appNames[spawnIndex]}`);
      child.stderr.pipe(process.stderr);
      child.on('error', (chunk: any) => {
        console.error(chunk);
      });
      child.stderr.on('data', (errout: { toString: () => any }) => {
        console.error('ERROR', errout.toString());
      });
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (data: { toString: () => any }) => {
        console.log(data.toString());
      });
      child.on('exit', (err: any, info: any) => {
        // console.log(err, info);
        fs.moveSync(
          cwd('.keystone/admin'),
          cwd(`.keystone/${appNames[spawnIndex]}/admin`)
        );
        fs.moveSync(
          cwd('.keystone/config.js'),
          cwd(`.keystone/${appNames[spawnIndex]}/config.js`)
        );
        fs.moveSync(
          cwd('node_modules/.prisma/client'),
          cwd(`.keystone/${appNames[spawnIndex]}/.prisma/client`)
        );

        pm2.connect(function (err: any) {
          if (err) {
            console.error(err);
            process.exit(2);
          }
          pm2.list((err: any, list: any[]) => {
            // We have to wait a couple of seconds before spawning the next build so that
            // pm2 has a chance to launch the start script, since starting one during this can
            // result in the subsequent build being used when loading this app's config
            const done = () => {
              spawnIndex++;
              appPort++;
              if (spawnIndex < appNames.length) spawnBuild();
              else process.exit(0);
            };
            if (
              list.find((proc) => proc.name === `cms-${appNames[spawnIndex]}`)
            ) {
              pm2.restart(
                `cms-${appNames[spawnIndex]}`,
                (err: any, proc: any) => {
                  pm2.disconnect();
                  done();
                }
              );
            } else {
              pm2.start(
                {
                  script: cwd('/export/lib/start.js'),
                  name: `cms-${appNames[spawnIndex]}`,
                  args: `--app=${appNames[spawnIndex]} --port=${appPort}`,
                  env: {
                    APP: appNames[spawnIndex],
                  },
                },
                function (err: any, apps: any) {
                  if (err) {
                    console.error(err);
                  }
                  pm2.disconnect();
                  done();
                }
              );
            }
          });
        });
      });
    });
  });
};
(async () => {
  // Remove output dirs
  fs.rmSync(path.join(process.cwd(), '/.keystone'), {
    recursive: true,
    force: true,
  });
  // Get all current CMS schemas from '../admin'
  const schemasDir = cwd('/admin/schema');
  const schemaItems = await fs.readdir(schemasDir);
  const schemaDirs = schemaItems.filter((schemaItem: any) => {
    return fs.statSync(`${schemasDir}/${schemaItem}`).isDirectory();
  });
  appNames = schemaDirs;
  spawnBuild();
})();
