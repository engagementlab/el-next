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
 * Heading renderer
 * ==========
 */

/**
 * Return a styled heading document fields
 * @returns {JSX.Element} Element
 * @see https://keystonejs.com/docs/guides/document-fields#overriding-the-default-renderers
 * @remarks
 * This is a renderer component that overrides Keystone's default document header styles with our default one, and further optional ones per heading level.
 * @example
 * const customRenderers = {
 *  3: 'text-4xl font-medium tracking-wider my-4',
 * };
 * return HeadingStyle({ level, children, textAlign, customRenderers });
 */
var HeadingStyle = function HeadingStyle(_ref) {
  var level = _ref.level,
      children = _ref.children,
      textAlign = _ref.textAlign,
      customRenderers = _ref.customRenderers;
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
