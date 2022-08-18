'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var framerMotion = require('framer-motion');
var jsxRuntime = require('react/jsx-runtime');

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
  var children = _ref.children;
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    children: /*#__PURE__*/jsxRuntime.jsx(framerMotion.motion.main, {
      initial: "hidden",
      animate: "enter",
      exit: "exit",
      variants: variants,
      transition: {
        type: 'linear'
      },
      children: children
    })
  });
};

exports["default"] = Layout;
