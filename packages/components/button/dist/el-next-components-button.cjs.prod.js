'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var Link = require('next/link');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var Link__default = /*#__PURE__*/_interopDefault(Link);

var Button = function Button(_ref) {
  var className = _ref.className;
      _ref.hoverColor;
      var link = _ref.link,
      label = _ref.label,
      margin = _ref.margin;
  return /*#__PURE__*/jsxRuntime.jsx(Link__default["default"], {
    href: link,
    passHref: true,
    children: /*#__PURE__*/jsxRuntime.jsx("button", {
      className: "".concat(margin !== undefined ? margin : "my-10", " inline-block rounded-full px-10 py-7 uppercase bg-purple text-white transition-all duration-700 hover:bg-[#ab45f8] hover:scale-105 ").concat(className, " "),
      children: label
    })
  });
};

exports.Button = Button;
