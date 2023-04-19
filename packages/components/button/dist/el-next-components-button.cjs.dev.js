'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var Link = require('next/link');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var Link__default = /*#__PURE__*/_interopDefault(Link);

/**
 * Return a <button> element wrapped in <Link>
 * @returns {JSX.Element} Element
 */
var Button = function Button(_ref) {
  var className = _ref.className,
      hoverColor = _ref.hoverColor,
      link = _ref.link,
      label = _ref.label,
      margin = _ref.margin;
  var classStr = "".concat(margin ? margin : "my-10", " hover:bg-[").concat(hoverColor ? hoverColor : '#ab45f8', "] hover:scale-105 inline-block rounded-full px-10 py-7 uppercase bg-purple text-white transition-all duration-700 ").concat(className);
  return /*#__PURE__*/jsxRuntime.jsx(Link__default["default"], {
    href: link,
    passHref: true,
    children: /*#__PURE__*/jsxRuntime.jsx("button", {
      className: classStr,
      children: label
    })
  });
};

exports.Button = Button;
