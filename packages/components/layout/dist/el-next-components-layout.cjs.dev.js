'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var Head = require('next/head');
var framerMotion = require('framer-motion');
var favicon_dist_elNextComponentsFavicon = require('../../favicon/dist/el-next-components-favicon.cjs.dev.js');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var Head__default = /*#__PURE__*/_interopDefault(Head);

var variants = {
  hidden: {
    opacity: 0
  },
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};
var Layout = function Layout(_ref) {
  var children = _ref.children,
      title = _ref.title,
      description = _ref.description;
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    children: [/*#__PURE__*/jsxRuntime.jsxs(Head__default["default"], {
      children: [/*#__PURE__*/jsxRuntime.jsx("title", {
        children: title
      }), process.env.NODE_ENV !== 'production' && /*#__PURE__*/jsxRuntime.jsx("meta", {
        name: "robots",
        content: "noindex"
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        name: "viewport",
        content: "initial-scale=1.0, width=device-width"
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        name: "description",
        content: description
      }), /*#__PURE__*/jsxRuntime.jsx(favicon_dist_elNextComponentsFavicon.Favicon, {})]
    }), /*#__PURE__*/jsxRuntime.jsx(framerMotion.motion.main, {
      initial: "hidden",
      animate: "enter",
      exit: "exit",
      variants: variants,
      transition: {
        type: 'linear'
      },
      children: children
    })]
  });
};

exports.Layout = Layout;
