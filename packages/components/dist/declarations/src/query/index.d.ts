import 'cross-fetch/polyfill';
import { ErrorClass } from '..';
export type TError = {
    class: ErrorClass;
    message?: string;
};
export declare const Query: (name: string, queryStr: string) => Promise<any>;
