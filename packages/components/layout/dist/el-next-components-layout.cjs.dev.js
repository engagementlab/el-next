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
    description = _ref.description,
    error = _ref.error;
  var errorHelper = "Sorry, we're unable to retrieve content at this time due to a connection error. ";
  if (error && error.message) {
    {
      if (error.message.indexOf('ECONNREFUSED') > -1) errorHelper += 'It is most likely that the CMS is currently unavailable. Please try again.';else if (error.message.toLowerCase().indexOf('syntax') > -1) errorHelper = 'It is looks like there is a syntax error in the query. This is a bug in code.';
    }
  }
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
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
    }), error ? /*#__PURE__*/jsxRuntime.jsxs("div", {
      className: "m-40",
      children: [/*#__PURE__*/jsxRuntime.jsxs("svg", {
        viewBox: "0 0 50 50",
        className: "max-w-[105px]",
        children: [/*#__PURE__*/jsxRuntime.jsx("circle", {
          style: {
            fill: '#D75A4A'
          },
          cx: "25",
          cy: "25",
          r: "25"
        }), /*#__PURE__*/jsxRuntime.jsx("polyline", {
          style: {
            fill: 'none',
            stroke: '#FFFFFF',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeMiterlimit: 10
          },
          points: "16,34 25,25 34,16  "
        }), /*#__PURE__*/jsxRuntime.jsx("polyline", {
          style: {
            fill: 'none',
            stroke: '#FFFFFF',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeMiterlimit: 10
          },
          points: "16,16 25,25 34,34  "
        })]
      }), /*#__PURE__*/jsxRuntime.jsx("h2", {
        className: "text-4xl font-bold",
        children: "Content Error"
      }), errorHelper]
    }) : /*#__PURE__*/jsxRuntime.jsx(framerMotion.motion.main, {
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
