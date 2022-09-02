'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var jsxRuntime = require('react/jsx-runtime');

// This is a renderer component that overrides Keystone's default document header styles with our default one and further optional ones per heading lvl
var HeadingStyle = function HeadingStyle(level, children, textAlign, customRenderers) {
  var defaultClass = "".concat(level === 3 && 'h3 text-2xl text-coated leading-none', " ").concat(level === 4 && 'text-md text-coated mt-8 lg:mt-12 mb-2', " font-semibold");
  var customClass = customRenderers && customRenderers[level];
  return /*#__PURE__*/jsxRuntime.jsx("p", {
    className: customClass || defaultClass,
    style: {
      textAlign: textAlign
    },
    children: children
  });
};

exports.HeadingStyle = HeadingStyle;
