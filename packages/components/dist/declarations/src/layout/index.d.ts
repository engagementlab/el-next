import { ReactNode } from 'react';
type Props = {
    children: ReactNode;
    title: string;
    description: string;
    error?: {
        message: string;
    };
};
export declare const Layout: ({ children, title, description, error, }: Props) => JSX.Element;
export {};
