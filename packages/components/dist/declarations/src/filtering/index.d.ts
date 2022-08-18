import React from "react";
import { StoreApi, UseBoundStore, State } from 'zustand';
interface ItemRendererProps<T> {
    item: T;
    toggleFilter: (filter: string) => void;
}
declare type FilterState = {
    currentFilters: never[];
    filtersNavOpen: boolean;
    filterGroupsClosed: never[];
    toggle: (filter: any) => void;
    toggleFilterGroupClosed: (filterKey: string) => void;
    toggleFiltersOpen: (open: boolean) => void;
    reset: () => void;
};
interface StoreSubscribeWithSelector<T extends State> {
    subscribe: {
        (listener: (selectedState: T, previousSelectedState: T) => void): () => void;
        <U>(selector: (state: T) => U, listener: (selectedState: U, previousSelectedState: U) => void, options?: {
            equalityFn?: (a: U, b: U) => boolean;
            fireImmediately?: boolean;
        }): () => void;
    };
}
export default class Filtering<T> {
    useStore: UseBoundStore<FilterState, Omit<StoreApi<FilterState>, "subscribe"> & StoreSubscribeWithSelector<FilterState>>;
    filtersGrouped: {
        [x: string]: any[];
    };
    items: any;
    mode?: string;
    ItemRenderer: React.ComponentType<ItemRendererProps<T>>;
    constructor(filtersGrouped: {
        [x: string]: any[];
    }, preSelectedFilters: never[], items: any[], ItemRenderer: React.ComponentType<ItemRendererProps<T>>, mode?: string);
    private RenderFilters;
    FilteredItems: () => JSX.Element;
}
export {};
