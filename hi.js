// const { exec } = require('child_process');
function exec(command, { capture = false, echo = false } = {}) {
  command = command.replace(/\\?\n/g, ''); // need to merge multi-line commands into one string

  if (echo) {
    console.log(command);
  }

  const spawn = require('child_process').spawn;
  const childProcess = spawn(command, {
    stdio: capture ? 'pipe' : 'inherit',
    shell: true,
  });

  return new Promise((resolve, reject) => {
    let stdout = '';

    if (capture) {
      childProcess.stdout.on('data', (data) => {
        stdout += data;
        console.log(stdout);
      });
    }

    childProcess.on('error', function (error) {
      reject({ code: 1, error: error });
    });

    childProcess.on('close', function (code) {
      if (code > 0) {
        reject({ code: code, error: 'Command failed with code ' + code });
      } else {
        resolve({ code: code, data: stdout });
      }
    });
  });
}
try {
  var yourscript = exec('cd apps/cms; npm run dev --app=tngvi', {
    capture: true,
  });
} catch (error) {
  console.error(error);
  process.exit((error && error.code) || 1); // properly exit with error code (useful for CI or chaining)
}
