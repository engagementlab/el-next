'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var jsxRuntime = require('react/jsx-runtime');

// This is a renderer component that overrides Keystone's default layout DocumentRendererProp to use flex, rather than grid layout, allowing for responsive layout
var FlexLayout = function FlexLayout(layout, children) {
  var flexClass = 'flex gap-x-5 flex-col-reverse md:flex-row';

  if (layout[0] === 2 && layout[1] === 1) {
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      className: flexClass,
      children: children.map(function (element, i) {
        return /*#__PURE__*/jsxRuntime.jsx("div", {
          className: "".concat(i === 0 ? 'w-full lg:w-3/4' : ''),
          children: element
        }, i);
      })
    });
  } else if (layout[0] === 1 && layout[1] === 1) {
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      className: flexClass,
      children: children.map(function (element, i) {
        return /*#__PURE__*/jsxRuntime.jsx("div", {
          className: "".concat(i === 0 ? 'w-full lg:w-1/2' : ''),
          children: element
        }, i);
      })
    });
  } else if (layout[0] === 1 && layout[1] === 1 && layout[2] === 1) {
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      className: flexClass,
      children: children.map(function (element, i) {
        return /*#__PURE__*/jsxRuntime.jsx("div", {
          className: "w-full lg:w-1/3",
          children: element
        }, i);
      })
    });
  } else return /*#__PURE__*/jsxRuntime.jsx("div", {
    children: children
  });
};

exports.FlexLayout = FlexLayout;
