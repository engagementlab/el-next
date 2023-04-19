/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * KeystoneJS document field renderers
 * ==========
 */

import React from 'react';

import { DocumentRendererProps } from '@keystone-6/document-renderer';

import { FlexLayout } from '@el-next/components/flexLayout';
import { HeadingStyle } from '@el-next/components/headingStyle';

/**
 * Create function that return doc rendrers used by Keystone
 * @function
 * @param {object} [styles] - optional app-globalized style classes to all doc fields
 * @returns {function}
 */
export const DocRenderers = (styles?: { linkClass?: string }) => {
  /**
   * @see https://keystonejs.com/docs/guides/document-fields#overriding-the-default-renderers
   */
  return (renderOverrides?: {
    heading?: Function;
    layout?: Function;
    link?: Function;
    bold?: Function;
  }): DocumentRendererProps['renderers'] => {
    let blocks: DocumentRendererProps['renderers'] = {
      inline: {
        bold: ({ children }) => {
          return renderOverrides?.bold ? (
            renderOverrides.bold(children)
          ) : (
            <strong>{children}</strong>
          );
        },
        link: ({ children, href }) => {
          const label = (children as any).at(0).props.node.text;
          let fixedHref = '';
          // Is href missing scheme and is not mailto or jumping anchor link?
          const hrefNoScheme =
            href.indexOf('mailto:') === -1 &&
            href.indexOf('#') === -1 &&
            href.search(/https:\/\/|http:\/\//gm) === -1;
          fixedHref = hrefNoScheme ? `https://${href}` : href;

          // Ensure that QA links don't show in production
          if (process.env.NODE_ENV === 'production')
            fixedHref = fixedHref.replace('qa.', '');

          return renderOverrides?.link ? (
            renderOverrides.link(children, fixedHref)
          ) : (
            <a
              href={fixedHref}
              target={href.indexOf('#') === 0 ? '_self' : '_blank'}
              className={`no-underline border-b-2 transition-all ${
                styles && styles.linkClass
              }`}
            >
              {label}
            </a>
          );
        },
      },
      block: {
        heading: ({ level, children, textAlign }) => {
          return renderOverrides?.heading
            ? renderOverrides.heading(level, children, textAlign)
            : HeadingStyle({ level, children, textAlign });
        },
        layout: ({ layout, children }) => {
          return renderOverrides?.layout
            ? renderOverrides.layout(layout, children)
            : FlexLayout({ layout, children });
        },
      },
    };
    return blocks;
  };
};
