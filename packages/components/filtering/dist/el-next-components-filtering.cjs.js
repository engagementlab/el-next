'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./el-next-components-filtering.cjs.prod.js");
} else {
  module.exports = require("./el-next-components-filtering.cjs.dev.js");
}
