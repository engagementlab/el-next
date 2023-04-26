import { ReactNode } from 'react';
import { TError } from '../query';
type Props = {
    children: ReactNode;
    title: string;
    description: string;
    error?: TError;
};
export declare const Layout: ({ children, title, description, error, }: Props) => JSX.Element;
export {};
