import 'cross-fetch/polyfill';
import { ErrorClass } from "../index.js";
export type TError = {
    class: ErrorClass;
    message?: string;
};
export declare const Query: (name: string, queryStr: string) => Promise<any>;
