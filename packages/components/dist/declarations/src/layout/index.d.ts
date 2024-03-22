import { ReactNode } from 'react';
import { Transition, Variants } from 'framer-motion';
import { TError } from '../query';
type Props = {
    children: ReactNode;
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
    error?: TError;
    transitions?: {
        variants: Variants;
        transition?: Transition;
    };
};
export declare const Layout: ({ children, title, description, error, transitions, ogDescription, ogTitle, ogImage, ogUrl, }: Props) => JSX.Element;
export {};
