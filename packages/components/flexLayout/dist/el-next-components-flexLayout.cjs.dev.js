'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var jsxRuntime = require('react/jsx-runtime');

/**
 * @packageDocumentation
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * Flex layout renderer
 * ==========
 */
/**
 * Return a flex layout for document fields
 * @returns {JSX.Element} Element
 * @see https://keystonejs.com/docs/guides/document-fields#overriding-the-default-renderers
 * @remarks
 * This is a renderer component that overrides KeystoneJS 5.x's default layout DocumentRendererProp to use flex, rather than grid layout, allowing for responsive layout
 */
var FlexLayout = function FlexLayout(_ref) {
  var layout = _ref.layout,
    children = _ref.children;
  var flexClass = 'flex gap-x-5 flex-col-reverse md:flex-row';
  // [  ][ ]
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
  }
  // [ ][  ]
  else if (layout[0] === 1 && layout[1] === 2) {
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      className: flexClass,
      children: children.map(function (element, i) {
        return /*#__PURE__*/jsxRuntime.jsx("div", {
          className: "".concat(i === 1 ? 'w-full lg:w-3/4' : ''),
          children: element
        }, i);
      })
    });
  }
  // [ ][ ][ ]
  else if (layout[0] === 1 && layout[1] === 1 && layout[2] === 1) {
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      className: flexClass,
      children: children.map(function (element, i) {
        return /*#__PURE__*/jsxRuntime.jsx("div", {
          className: "w-full lg:w-1/3",
          children: element
        }, i);
      })
    });
  }
  // [ ][ ]
  else if (layout[0] === 1 && layout[1] === 1) {
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      className: flexClass,
      children: children.map(function (element, i) {
        return /*#__PURE__*/jsxRuntime.jsx("div", {
          className: "".concat(i === 0 ? 'w-full lg:w-1/2' : ''),
          children: element
        }, i);
      })
    });
  } else return /*#__PURE__*/jsxRuntime.jsx("div", {
    children: children
  });
};

exports.FlexLayout = FlexLayout;
