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
 * External link renderer
 * ==========
 */
/**
 * Return a link with "external" SVG icon
 * @returns {JSX.Element} Element
 */
var ExternalLink = function ExternalLink(_ref) {
  var href = _ref.href,
    label = _ref.label,
    customClass = _ref.customClass;
  return /*#__PURE__*/jsxRuntime.jsxs("a", {
    href: href,
    className: "".concat(customClass || 'text-bluegreen', " group"),
    children: [label, "\xA0\xA0", /*#__PURE__*/jsxRuntime.jsx("svg", {
      viewBox: "4.222 4.222 15.556 15.556",
      width: "15.556",
      height: "15.556",
      className: "inline group-hover:translate-x-1 group-hover:-translate-y-1  transition-all",
      children: /*#__PURE__*/jsxRuntime.jsx("path", {
        d: "M 13 7 L 18 12 M 18 12 L 13 17 M 18 12 L 6 12",
        transform: "matrix(0.707107, -0.707107, 0.707107, 0.707107, -4.970563, 12)",
        style: {
          stroke: 'rgb(2, 102, 112)',
          strokeWidth: '1px'
        }
      })
    })]
  });
};

exports.ExternalLink = ExternalLink;
