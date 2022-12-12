"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _yargs = _interopRequireDefault(require("yargs/yargs"));

var _express = _interopRequireDefault(require("express"));

var _keystone6CoreSystemCjs = require("@keystone-6/core/system/dist/keystone-6-core-system.cjs.js");

/**
 *
 * Developed by Engagement Lab, 2022
 * @author Johnny Richardson
 *
 */
const argv = (0, _yargs.default)(process.argv.slice(2)).options({
  app: {
    type: 'string',
    demandOption: true
  },
  port: {
    type: 'number'
  }
}).argv;

var _default = (async () => {
  var _config$ui;

  const apiFile = _path.default.join(process.cwd(), `.keystone/${argv.app}/config.js`); // if (!fs.existsSync(apiFile)) {
  //   console.log('🚨 keystone build must be run before running keystone start');
  //   throw new Error('run build' + apiFile);
  // }
  // webpack will make modules that import Node ESM externals(which must be loaded with dynamic import)
  // export a promise that resolves to the actual export so yeah, we need to await a require call


  const config = (0, _keystone6CoreSystemCjs.initConfig)((await require(apiFile)).default);
  console.log(config);
  const {
    getKeystone,
    graphQLSchema
  } = (0, _keystone6CoreSystemCjs.createSystem)(config);

  const prismaClient = require(_path.default.join(process.cwd(), `.keystone/${argv.app}/.prisma/client`));

  const keystone = getKeystone(prismaClient);
  console.log('✨ Connecting to the database');
  await keystone.connect();
  console.log('✨ Creating server');
  const {
    expressServer
  } = await (0, _keystone6CoreSystemCjs.createExpressServer)(config, graphQLSchema, keystone.createContext);
  console.log(`✅ GraphQL API ready`);

  if (!((_config$ui = config.ui) !== null && _config$ui !== void 0 && _config$ui.isDisabled)) {
    console.log('✨ Preparing Admin UI Next.js app');
    const middleware = await (0, _keystone6CoreSystemCjs.createAdminUIMiddleware)(config, keystone.createContext, false, _path.default.join(process.cwd(), `.keystone/${argv.app}/admin`));
    expressServer.use('/_next/static/', _express.default.static(_path.default.join(process.cwd(), `.keystone/${argv.app}/admin/.next/static`)));
    expressServer.use((req, res) => middleware(req, res));
    expressServer.use((req, res) => {
      console.log(req.path);
    });
    console.log(`✅ Admin UI ready`);
    const port = argv.port || process.env.PORT || 3000;
    expressServer.listen(port, err => {
      if (err) throw err;
      console.log(`⭐️ Server Ready on http://localhost:${port}`);
    });
  }
})();

exports.default = _default;