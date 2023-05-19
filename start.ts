const fs = require('fs');
const path = require('path');

const util = require('node:util');
const execFile = util.promisify(require('node:child_process').execFile);

const { spawn } = require('child_process');
const { execSync } = require('child_process');
const prompts = require('prompts');

const pkgsPath = path.join(__dirname, '..', 'apps');
const dirs = fs.readdirSync(pkgsPath);
const choices = [];

enum AppType {
  API = '🧰',
  CMS = '📃',
  FRONTEND = '🖥️',
}

function exec(command, appType: AppType) {
  command = command.replace(/\\?\n/g, ''); // need to merge multi-line commands into one string

  const spawn = require('child_process').spawn;
  const childProcess = spawn(command, {
    stdio: 'pipe',
    shell: true,
  });

  return new Promise((resolve, reject) => {
    let stdout = '';

    childProcess.stdout.on('data', (data) => {
      console.log(`${appType}: ${data.toString()}`);
    });

    childProcess.on('error', function (error) {
      console.log(error.toString());

      reject({ code: 1, error: error });
    });

    childProcess.on('close', function (code) {
      console.log('Command exited with code ' + code);
      if (code > 0) {
        reject('Command failed with code ' + code);
      } else {
        resolve({ code: code, data: stdout });
      }
    });
  }).catch((err) => {
    throw new Error(err);
  });
}
/**
 * Get config data for all app packages and prompt for which one to use in dev instance.
 */
(async () => {
  // Do not include 'cms' or 'api' package
  const dirsFiltered = dirs.filter((name: string) => {
    return name !== 'cms' && name !== 'api';
  });
  dirsFiltered.forEach((name: string) => {
    if (fs.statSync(path.join(pkgsPath, name)).isDirectory()) {
      // Obj for usage in choices
      choices.push({
        title: name,
        description: name,
        value: name,
      });
    }
  });

  const response = await prompts({
    type: 'select',
    name: 'value',
    message: 'Pick an app to run:',
    choices,
  });

  try {
    exec('cd apps/api; npm run dev', AppType.API);
    exec(`cd apps/cms; yarn dev --app ${response.value}`, AppType.CMS);
    exec(`cd apps/${response.value}; yarn dev`, AppType.FRONTEND);
  } catch (error) {
    console.error(error);
  }
})();
