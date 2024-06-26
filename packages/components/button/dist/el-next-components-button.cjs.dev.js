'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var Link = require('next/link');
var reactScroll = require('react-scroll');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var Link__default = /*#__PURE__*/_interopDefault(Link);

/**
 * Return a <button> element wrapped in <Link>
 * @returns {React.JSX.Element} Element
 */
var Button = function Button(_ref) {
  var className = _ref.className,
    hoverColor = _ref.hoverColor,
    link = _ref.link,
    external = _ref.external,
    label = _ref.label,
    margin = _ref.margin,
    anchorId = _ref.anchorId,
    classOverride = _ref.classOverride,
    icon = _ref.icon,
    onClick = _ref.onClick;
  var scrollTo = function scrollTo(element) {
    reactScroll.scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };
  var classStr = "".concat(margin ? margin : "my-10", " hover:bg-[").concat(hoverColor ? hoverColor : '#ab45f8', "] hover:scale-105 inline-block rounded-full px-10 py-7 uppercase bg-purple text-white transition-all duration-700 ").concat(className);
  var anchorClassStr = "flex items-start transition-all font-bold duration-700 group text-sm lg:text-lg mt-3 font-semibold ".concat(className);
  if (anchorId) {
    return /*#__PURE__*/jsxRuntime.jsx("button", {
      className: classOverride || anchorClassStr,
      onClick: function onClick() {
        return scrollTo(anchorId);
      },
      children: /*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "lg:inline-flex items-center overflow-hidden",
        children: [/*#__PURE__*/jsxRuntime.jsx("svg", {
          width: "17",
          height: "17",
          viewBox: "0 0 24 24",
          className: "inline rotate-180 lg:rotate-90 mr-2 transition-transform group-hover:rotate-180 ".concat(className),
          children: /*#__PURE__*/jsxRuntime.jsx("path", {
            d: "M24 22h-24l12-20z"
          })
        }), /*#__PURE__*/jsxRuntime.jsxs("span", {
          className: "",
          children: [label, /*#__PURE__*/jsxRuntime.jsx("hr", {
            className: "transition-all w-[150%] border-b-2  group-hover:-translate-x-[25px] hidden lg:block"
          })]
        })]
      })
    }, "btn-".concat(label.toLocaleLowerCase().replaceAll(/[^\w ]/g, '-')));
  }
  if (onClick) return /*#__PURE__*/jsxRuntime.jsxs("button", {
    className: "group ".concat(classOverride || classStr),
    onClick: onClick,
    children: [label, " ", icon]
  });
  var linkFormatted = link.replace('elabhome.blob.core.windows.net', 'files.elab.works');
  return /*#__PURE__*/jsxRuntime.jsxs(Link__default["default"], {
    href: linkFormatted,
    passHref: true,
    target: external ? '_blank' : '_self',
    className: "group ".concat(classOverride || classStr),
    children: [label, " ", icon]
  });
};

exports.Button = Button;
