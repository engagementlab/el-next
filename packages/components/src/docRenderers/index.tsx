import React from "react";

import { DocumentRendererProps } from '@keystone-6/document-renderer';

import { FlexLayout } from '@el-next/components/flexLayout';
import { HeadingStyle} from '@el-next/components/headingStyle';

export const DocRenderers = (renderOverrides?: { heading?: Function; layout?: Function; link?: Function; bold?: Function; }): DocumentRendererProps['renderers'] => {
let blocks: DocumentRendererProps['renderers'] = {
    inline: {
        bold: ({children}) => {
            return renderOverrides?.bold ? renderOverrides.bold(children) : <strong>{children}</strong>;
        },
        link: ({ children, href }) => {
            const label = (children as any).at(0).props.node.text;
            let fixedHref = '';
            // Is href missing scheme?
            const hrefNoScheme = href.search(/https:\/\/|http:\/\//gm) === -1;
            fixedHref = hrefNoScheme ? `https://${href}` : href;
            if(process.env.NODE_ENV === 'production')
                fixedHref = fixedHref.replace('qa.', '');
             
            return renderOverrides?.link ? renderOverrides.link(children, fixedHref) : <a href={fixedHref} target="_blank" className='text-purple no-underline border-b-2 border-b-[rgba(141,51,210,0)] hover:border-b-[rgba(141,51,210,1)] transition-all'>{label}</a>;
        }    
    }, 
    block: {
        heading: ({ level, children, textAlign }) => {
            return renderOverrides?.heading ? renderOverrides.heading(level, children, textAlign) : HeadingStyle(level, children, textAlign);
        },
        layout: ({layout, children}) => {
            return  renderOverrides?.layout ? renderOverrides.layout(layout, children) : FlexLayout(layout, children);
        }
    },
  }
  return blocks;
};