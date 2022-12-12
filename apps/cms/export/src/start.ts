/**
 *
 * Developed by Engagement Lab, 2022
 * @author Johnny Richardson
 *
 */

import path from 'path';
import fs from 'fs';
import yargs from 'yargs/yargs';
import express from 'express';
import {
  createSystem,
  createExpressServer,
  createAdminUIMiddleware,
  initConfig,
} from '@keystone-6/core/system/dist/keystone-6-core-system.cjs.js';

const argv: any = yargs(process.argv.slice(2)).options({
  app: { type: 'string', demandOption: true },
  port: { type: 'number' },
}).argv;

export default (async () => {
  const apiFile = path.join(process.cwd(), `.keystone/${argv.app}/config.js`);

  // if (!fs.existsSync(apiFile)) {
  //   console.log('🚨 keystone build must be run before running keystone start');
  //   throw new Error('run build' + apiFile);
  // }
  // webpack will make modules that import Node ESM externals(which must be loaded with dynamic import)
  // export a promise that resolves to the actual export so yeah, we need to await a require call
  const config = initConfig((await require(apiFile)).default);
  console.log(config);
  const { getKeystone, graphQLSchema } = createSystem(config);

  const prismaClient = require(path.join(
    process.cwd(),
    `.keystone/${argv.app}/.prisma/client`
  ));

  const keystone = getKeystone(prismaClient);

  console.log('✨ Connecting to the database');
  await keystone.connect();

  console.log('✨ Creating server');
  const { expressServer } = await createExpressServer(
    config,
    graphQLSchema,
    keystone.createContext
  );

  console.log(`✅ GraphQL API ready`);
  if (!config.ui?.isDisabled) {
    console.log('✨ Preparing Admin UI Next.js app');
    const middleware = await createAdminUIMiddleware(
      config,
      keystone.createContext,
      false,
      path.join(process.cwd(), `.keystone/${argv.app}/admin`)
    );
    expressServer.use(
      '/_next/static/',
      express.static(
        path.join(process.cwd(), `.keystone/${argv.app}/admin/.next/static`)
      )
    );
    expressServer.use((req, res) => middleware(req, res));
    expressServer.use((req, res) => {
      console.log(req.path);
    });

    console.log(`✅ Admin UI ready`);

    const port = argv.port || process.env.PORT || 3000;
    expressServer.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`⭐️ Server Ready on http://localhost:${port}`);
    });
  }
})();
