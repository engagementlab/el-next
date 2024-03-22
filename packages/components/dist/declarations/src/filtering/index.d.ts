/**
 * @packageDocumentation
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * Filter rendered items given a grouped list of filters and data source
 * ==========
 */
import React from 'react';
import { StoreApi, UseBoundStore, State } from 'zustand';
interface ItemRendererProps<T> {
    item: T;
    toggleFilter: (filter: string) => void;
}
interface FilterState {
    currentFilters: never[];
    filtersNavOpen: boolean;
    filterGroupsClosed: never[];
    toggle: (filter: any) => void;
    toggleFilterGroupClosed: (filterKey: string) => void;
    toggleFiltersOpen: (open: boolean) => void;
    reset: () => void;
}
/**
 * Subscriber interface
 * @see https://github.com/pmndrs/zustand/blob/a418fd748077c453efbff2d03641ce0af780b3c7/src/middleware/subscribeWithSelector.ts
 */
interface StoreSubscribeWithSelector<T extends State> {
    subscribe: {
        (listener: (selectedState: T, previousSelectedState: T) => void): () => void;
        <U>(selector: (state: T) => U, listener: (selectedState: U, previousSelectedState: U) => void, options?: {
            equalityFn?: (a: U, b: U) => boolean;
            fireImmediately?: boolean;
        }): () => void;
    };
}
/**
 * Creates an instance of Filtered items and a filtering UI
 * @example
 * type I = {
 *  title: string;
 *  key: string;
 * };
 *
 * // Group filters by type
 * const filtersGrouped = filters.reduce((filterMemo, { type, key, name }) => {
 *   (filterMemo[type] = filterMemo[type] || []).push({
 *     key,
 *     name,
 *   });
 *   return filterMemo;
 * }, {});
 *
 * const mediaItems = [some, some, some, some];
 *
 * const renderItem = (props: {
 *   item: I;
 *   toggleFilter: (filter: string) => void;
 * }) => {
 *   return (
 *     <h3>
 *     {props.title}
 *     </h3>
 *     ...
 *   );
 * };
 *
 * const filtering = new Filtering<Item>(
 *  filtersGrouped,
 *  [],
 *  mediaItems,
 *  renderItem,
 * 'media'
 * );
 * ...
 * <filtering.FilteredItems />
 *
 */
export default class Filtering<T> {
    /**
     * Zustand store
     * @see https://github.com/pmndrs/zustand
     */
    useStore: UseBoundStore<FilterState, Omit<StoreApi<FilterState>, 'subscribe'> & StoreSubscribeWithSelector<FilterState>>;
    filtersGrouped: {
        [x: string]: any[];
    };
    items: any;
    mode?: string;
    ItemRenderer: React.ComponentType<ItemRendererProps<T>>;
    /**
     * @prop filtersGrouped Filters with a key and named grouped by type
     * @prop preSelectedFilters Array of pre selected filters, for e.g. from `router.query`, or empty array
     * @prop items Array of all possible data to render
     * @prop ItemRenderer Function to render filtered items with props conforming to <ItemRendererProps<T>>
     * @prop mode? Optional string of 'media' to change the count label
     */
    constructor(filtersGrouped: {
        [x: string]: any[];
    }, preSelectedFilters: never[], items: any[] | null, ItemRenderer: React.ComponentType<ItemRendererProps<T>>, mode?: string);
    private RenderFilters;
    FilteredItems: () => JSX.Element;
}
export {};
