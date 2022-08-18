import { DocumentRendererProps } from '@keystone-6/document-renderer';
export declare const DocRenderers: (renderOverrides?: {
    heading?: Function;
    layout?: Function;
    link?: Function;
    bold?: Function;
}) => DocumentRendererProps['renderers'];
