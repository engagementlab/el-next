import React from "react";
import { useRouter } from 'next/router'
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware'
import _ from 'lodash';
import { AnimatePresence } from "framer-motion"

export type MediaItem = {
    title?: string;
    name?: string;
    key: string;
    shortDescription?: string;
    blurb?: string;
    filters: string;
    thumbnail: {
        publicId: string;
    }
}
type ItemRendererProps = {
    item: MediaItem;
}

type FilterState = {
    currentFilters: any[];
    filtersNavOpen: boolean
    filterGroupsClosed: string[]
    toggle: (filter: any) => void
    toggleFilterGroupClosed: (filterKey: string) => void
    toggleFiltersOpen: (open: boolean) => void
    reset: () => void
}

// Create store with Zustand
const useStore = create<FilterState>(set => ({
    currentFilters: [],
    filtersNavOpen: false,
    filterGroupsClosed: [],
    toggle: (filter: any) => set((state) => {
        return state.currentFilters.includes(filter) ?
        {
            ...state,
            currentFilters: state.currentFilters.filter(e => e !== filter)
        }
        :
        {
            ...state,
            currentFilters: [...state.currentFilters, filter]
        }
    }), 
    toggleFilterGroupClosed: (filterGroupKey: string) => set((state) => {
        return state.filterGroupsClosed.includes(filterGroupKey) ?
        {
            ...state,
            filterGroupsClosed: state.filterGroupsClosed.filter(e => e !== filterGroupKey)
        }
        :
        {
            ...state,
            filterGroupsClosed: [...state.filterGroupsClosed, filterGroupKey]
        }
    }),     
    toggleFiltersOpen: (open: boolean) => set((state) => { 
        document.body.style.overflow = open ? 'hidden' : 'visible';
        if(open) window.scrollTo(0, 0);
        return { ...state, filtersNavOpen:open }; 
    }),
    reset: () => set({ currentFilters: [] }),
}));


const RenderFilters = (filters: { [x: string]: any[]; }) => {
   
    // Store get/set
    const selectedFilters = useStore(state => state.currentFilters);
    const filtersOpen = useStore(state => state.filtersNavOpen);
    const filterGroupsClosed = useStore(state => state.filterGroupsClosed)
    const haveFilters = selectedFilters.length > 0;
    
    const haveSpecificFilter = (key: string) => {return _.values(selectedFilters).includes(key)};
    const haveGroupClosed = (key: string) => {return filterGroupsClosed.includes(key)};
    const toggleFilter = useStore(state => state.toggle);
    const toggleFilterGroupOpen = useStore(state => state.toggleFilterGroupClosed);
    const reset = useStore(state => state.reset);
    const toggleFiltersOpen = useStore(state => state.toggleFiltersOpen);

    const router = useRouter();
    // useStore.subscribe(state => state.currentFilters,  () => 
    // {
    //     router.push({ pathname: router.asPath, query: {filters: selectedFilters[0]} }, undefined, {shallow: true})
    // });
    useStore.subscribe((e => {
        console.log(e.currentFilters)
        // router.push({ pathname: router.asPath, query: {filters: e.currentFilters.join('-')} }, undefined, {shallow: true})
    }))
    const menu = <div>
                    {Object.keys(filters).map((key) => (
                        <div key={key}>
                            <a href="#" className="text-xl xl:text-base" onClick={(e)=>{ toggleFilterGroupOpen(key); e.preventDefault() }}>
                                <div className="mt-4 flex items-center flex-shrink-0 flex-grow-0 uppercase">
                                    <svg height="10.0" width="14" className={`inline transition-transform ${haveGroupClosed(key) ? 'rotate-180' : ''}`}>
                                        <polygon points="0,0 14,0 7.0,9.0" style={{'fill':'#8D33D2'}}></polygon>
                                    </svg>
                                    <span className="ml-2">    
                                        {key}
                                    </span> 
                                </div>
                            </a>
                            <ul className={`relative overflow-hidden transition-all ${haveGroupClosed(key) ? 'max-h-0' : 'max-h-96'}`}>
                                {filters[key].map(filter => {
                                    return (
                                        <li key={filter.key} className={`mt-4 text-lg xl:text-sm font-semibold
                                            ${!haveSpecificFilter(filter.key) ? 'text-bluegreen' : 'text-purple' }`}>
                                            <a href="#" onClick={(e)=>{ toggleFilter(filter.key); e.preventDefault() }}
                                                className='w-3/4 flex items-center justify-between'>
                                                {filter.name}
                                                <svg viewBox="185.411 115.41 11 11" width="11" height="11"
                                                    className='flex-shrink-0'
                                                    style={{visibility: !haveSpecificFilter(filter.key) ? 'hidden' : 'visible'}}>
                                                    <path
                                                        d="M 195.198 115.41 L 190.911 119.695 L 186.624 115.41 L 185.411 116.623 L 189.696 120.91 L 185.411 125.197 L 186.624 126.41 L 190.911 122.125 L 195.198 126.41 L 196.411 125.197 L 192.126 120.91 L 196.411 116.623 Z"
                                                        className="fill-purple"></path>
                                                </svg>
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </div>;

    return( <div> 
            {/* Tablet portrait+ */}
            <div className="hidden lg:block">
                <div className="mr-2 flex justify-between">
                    <span>Filters</span>
                    <a href="#" className="text-bluegreen" onClick={(e) =>{ reset(); e.preventDefault() }}  style={{visibility: !haveFilters ? 'hidden' : 'visible'}}>Clear</a> 
                </div>
                {menu}
            </div>
            {/* Mobile/tablet */}
            <div className={`lg:hidden block w-full absolute overflow-y-scroll top-0 left-0 h-full z-50 p-10 pt-20 bg-lynx
                transition-all ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300 ${filtersOpen ? ''
                : '-translate-y-full' }`}>
                <a className="uppercase w-full flex justify-end" onClick={(e)=>{ toggleFiltersOpen(false);
                    e.preventDefault() }}>
                    <svg viewBox="185.411 115.41 11 11" width="11" height="11" className='flex-shrink-0'>
                        <path
                            d="M 195.198 115.41 L 190.911 119.695 L 186.624 115.41 L 185.411 116.623 L 189.696 120.91 L 185.411 125.197 L 186.624 126.41 L 190.911 122.125 L 195.198 126.41 L 196.411 125.197 L 192.126 120.91 L 196.411 116.623 Z"
                            className="fill-purple"></path>
                    </svg>
                </a>
                {menu}
                <button
                    className="my-4 w-full rounded-full px-6 py-2 uppercase bg-purple text-white transition-all hover:opacity-75"
                    onClick={(e)=>{ toggleFiltersOpen(false) }}>Apply</button>
            </div>
        </div>);
}
const FilteredItems = (filtersGrouped: {
        [x: string]: any[];
    }, items: any[], ItemRenderer: React.ComponentType < ItemRendererProps >, mode?: string ) => {

        const selectedFilters = useStore(state => state.currentFilters);
        const haveFilters = selectedFilters.length > 0;
        const reset = useStore(state => state.reset);
        const toggleFiltersOpen = useStore(state => state.toggleFiltersOpen);
        const filteredItems = items.filter(
            // If selected filters empty, show all...
            item => selectedFilters.length === 0 ||
            // ...otherwise, item's filters must match ALL selected filters
            _.every(selectedFilters, r => _.map(item.filters, 'key').indexOf(r) >= 0));

        const count = filteredItems.length;
        // Decide plural of item count
        const showing = `Showing ${count} ${mode === 'media' ? 
                                `Stor${count === 1 ? 'y' : 'ies'}` : 
                                `Studio${count === 1 ? '' : 's'}`}`;

        return <div className="flex">
            <div className='w-0 lg:w-2/5 xl:w-1/5 flex-shrink-0 xl:border-r border-[#B9CCC7]'>
                {RenderFilters(filtersGrouped)}
            </div>

            <div className="w-full">
                {/* Mobile Filters/Clear button */}

                <div className="lg:hidden inline-block w-full">
                    <button
                        className="rounded-full my-4 px-6 py-2 w-full uppercase bg-purple text-white transition-all hover:opacity-75"
                        onClick={(e)=>{ toggleFiltersOpen(true); e.preventDefault() }}>Filters</button>
                    <button
                        className="rounded-full my-2 px-6 py-2 w-full uppercase bg-purple text-white transition-all hover:opacity-75"
                        onClick={(e)=>{ reset(); e.preventDefault() }}
                        style={{display: !haveFilters ? 'none' : 'block'}}>Clear</button>
                </div>
                <span className="my-4 uppercase w-full block lg:text-right">{showing}</span>
                    
                <div className={mode === 'media' ? 'xl:flex xl:ml-5' : ''}>{
                    count === 0 ?
                    <p className='w-full text-4xl text-center'>No matches! Please try other filters.</p> :
                            <AnimatePresence>
                                {filteredItems.map((item: MediaItem, i: number) => (
                                    <ItemRenderer key={i} item={item} />
                                ))}
                            </AnimatePresence>
                    }
                </div>
            </div>
        </div>
};

export default FilteredItems;
