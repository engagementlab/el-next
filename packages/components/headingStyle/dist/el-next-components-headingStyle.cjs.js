'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./el-next-components-headingStyle.cjs.prod.js");
} else {
  module.exports = require("./el-next-components-headingStyle.cjs.dev.js");
}
