'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var flexLayout = require('@el-next/components/flexLayout');
var headingStyle = require('@el-next/components/headingStyle');
var jsxRuntime = require('react/jsx-runtime');

/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * KeystoneJS document field renderers
 * ==========
 */
var DocRenderers = function DocRenderers(styles) {
  /**
   * @see https://keystonejs.com/docs/guides/document-fields#overriding-the-default-renderers
   */
  return function (renderOverrides) {
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
          var fixedHref = ''; // Is href missing scheme and is not mailto or jumping anchor link?

          var hrefNoScheme = href.indexOf('mailto:') === -1 && href.indexOf('#') === -1 && href.search(/https:\/\/|http:\/\//gm) === -1;
          fixedHref = hrefNoScheme ? "https://".concat(href) : href; // Ensure that QA links don't show in production

          fixedHref = fixedHref.replace('qa.', '');
          return renderOverrides !== null && renderOverrides !== void 0 && renderOverrides.link ? renderOverrides.link(children, fixedHref) : /*#__PURE__*/jsxRuntime.jsx("a", {
            href: fixedHref,
            target: href.indexOf('#') === 0 ? '_self' : '_blank',
            className: "no-underline border-b-2 transition-all ".concat(styles && styles.linkClass),
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
          return renderOverrides !== null && renderOverrides !== void 0 && renderOverrides.layout ? renderOverrides.layout(_layout, children) : flexLayout.FlexLayout({
            layout: _layout,
            children: children
          });
        }
      }
    };
    return blocks;
  };
};

exports.DocRenderers = DocRenderers;
