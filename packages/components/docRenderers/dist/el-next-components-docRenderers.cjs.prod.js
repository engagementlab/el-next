'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var flexLayout = require('@el-next/components/flexLayout');
var headingStyle = require('@el-next/components/headingStyle');
var jsxRuntime = require('react/jsx-runtime');

var DocRenderers = function DocRenderers(renderOverrides) {
  var blocks = {
    inline: {
      bold: function bold(_ref) {
        var children = _ref.children;
        return renderOverrides !== null && renderOverrides !== void 0 && renderOverrides.bold ? renderOverrides.bold(children) : /*#__PURE__*/jsxRuntime.jsx("strong", {
          children: children
        });
      },
      link: function link(_ref2) {
        var children = _ref2.children,
            href = _ref2.href;
        var label = children.at(0).props.node.text;
        return renderOverrides !== null && renderOverrides !== void 0 && renderOverrides.link ? renderOverrides.link(children, href) : /*#__PURE__*/jsxRuntime.jsx("a", {
          href: href,
          target: "_blank",
          className: "text-purple no-underline border-b-2 border-b-[rgba(141,51,210,0)] hover:border-b-[rgba(141,51,210,1)] transition-all",
          children: label
        });
      }
    },
    block: {
      heading: function heading(_ref3) {
        var level = _ref3.level,
            children = _ref3.children,
            textAlign = _ref3.textAlign;
        return renderOverrides !== null && renderOverrides !== void 0 && renderOverrides.heading ? renderOverrides.heading(level, children, textAlign) : headingStyle.HeadingStyle(level, children, textAlign);
      },
      layout: function layout(_ref4) {
        var _layout = _ref4.layout,
            children = _ref4.children;
        return renderOverrides !== null && renderOverrides !== void 0 && renderOverrides.layout ? renderOverrides.layout(_layout, children) : flexLayout.FlexLayout(_layout, children);
      }
    }
  };
  return blocks;
};

exports.DocRenderers = DocRenderers;
