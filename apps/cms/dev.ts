import yargs from 'yargs/yargs';
(() => {
  const argv: any = yargs(process.argv.slice(2)).options({
    app: {
      type: 'string',
    },
  }).argv;

  function exec(command: string) {
    command = command.replace(/\\?\n/g, ''); // need to merge multi-line commands into one string

    const spawn = require('child_process').spawn;
    const childProcess = spawn(command, {
      stdio: 'pipe',
      shell: true,
    });

    return new Promise((resolve, reject) => {
      let stdout = '';

      childProcess.stdout.on('data', (data: { toString: () => any }) => {
        console.log(`${data.toString()}`);
      });

      childProcess.on('error', function (error: { toString: () => any }) {
        console.log(error.toString());

        reject({ code: 1, error: error });
      });

      childProcess.on('close', function (code: number) {
        console.log(`Command "${command}" exited`);
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
  try {
    exec('rm -f admin/schema/index.ts');
    exec(
      `ln -s ${__dirname}/admin/schema/${argv.app}/index.ts ${__dirname}/admin/schema/index.ts`
    );
    exec(`yarn keystone dev --app ${argv.app}`);
    // exec(`cd apps/${response.value}; yarn dev`, AppType.FRONTEND);
  } catch (error) {
    console.error(error);
  }
})();
