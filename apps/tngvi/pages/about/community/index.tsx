import {
  InferGetStaticPropsType
} from 'next';
import {
  Image
} from '@el-next/components/image';
import { DocumentRenderer, } from '@keystone-6/document-renderer';

import create, {
  Mutate,
  GetState,
  SetState,
  StoreApi,
} from 'zustand'
import {
  subscribeWithSelector
} from 'zustand/middleware'
import _ from 'lodash';
import {
  AnimatePresence
} from "framer-motion"

import Layout from '../../../components/Layout';
import query from "../../../apollo-client";
import {
  useRouter
} from 'next/router';
import { DocRenderers, BlockRenderers, HeadingStyle } from '@el-next/components';
import { ReactNode } from 'react';
import Link from 'next/link';

type CommunityPage = {
  values: any;
};

type Person = {
  name: string;
  key: string;
  tag: string;
  title: string;
  currentlyActive: boolean;
  remembrance: string;
  blurb: string;
  image: any;
  content: any;
};

type FilterState = {
  currentFilters: never[];
  // currentFilter: string;
  toggle: (filter: string) => void
  reset: () => void
}


const rendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {

    const customRenderers = {
      4: 'text-xl font-semibold text-coated my-8',
      5: 'text-lg font-extrabold text-purple'
    };
    return HeadingStyle(level, children, textAlign, customRenderers);
},
};

let filterOverride: string | null = null;
// Create store with Zustand
const useStore = create <
  FilterState,
  SetState < FilterState > ,
  GetState < FilterState > ,
  Mutate < StoreApi < FilterState > , [
    ["zustand/subscribeWithSelector", never]
  ] >
  >
  (
    subscribeWithSelector((set) => ({
      currentFilters: [],
      toggle: (filter: any) => set((state) => {
        return state.currentFilters.includes(filter as never) ? {
                ...state,
                currentFilters: state.currentFilters.filter(e => e !== filter)
            } :
            {
                ...state,
                currentFilters: [...state.currentFilters, filter as never]
            }
    }),
      reset: () => set({
        currentFilters: []
      }),
    })));

// useStore.subscribe(state => state.currentFilter, (current) => {
//   console.log('current', current)
//   history.replaceState({}, 'Filtered Data', `${location.pathname}?${current}`);
// });
export default function Community({ page, currentPeople, previousPeople }: InferGetStaticPropsType<typeof getStaticProps>) {

  const router = useRouter();
  const toggleFilter = useStore(state => state.toggle);
  // const preSelectedFilter = Object.keys(router.query).length === 1 ? Object.keys(router.query)[0] : '';
  // let selectedFilter = filterOverride || (preSelectedFilter.length > 0 ? preSelectedFilter : '');
  // console.log('query',router.query, preSelectedFilter)

  // toggleFilter(selectedFilter)
  
  // Store get/set
  // if(filterOverride && (preSelectedFilter !== filterOverride))
  const selectedFilters = useStore(state => state.currentFilters);

  const haveFilters = selectedFilters.length > 0;
  const haveSpecificFilter = (key: string) => {
    return _.values(selectedFilters).includes(key as never)
  };
  const reset = useStore(state => state.reset);
  
  const filteredCurrentPpl = currentPeople.filter(
    // If selected filters empty, show all...
    item => selectedFilters.length === 0 ||
    // ...otherwise, item's filters must match one of the selected filters
    _.some(selectedFilters, r => _.map(item.tag).indexOf(r) >= 0));

  const filteredPreviousPpl = previousPeople.filter(
    // If selected filters empty, show all...
    item => selectedFilters.length === 0 ||
    // ...otherwise, item's filters must match one of the selected filters
    _.some(selectedFilters, r => _.map(item.tag).indexOf(r) >= 0));
  
  const RenderFilters = (filters: string[]) => {
    
    const linkClass = 'no-underline border-b-2 border-b-[rgba(2,102,112,0)] hover:border-b-[rgba(2,102,112,1)] transition-all';
  
    const menu = <div className="flex flex-col justify-between md:flex-row md:w-3/4 lg:w-1/2">
                    <span>Filter:</span>
                    <div className='flex items-center justify-between mt-3 md:mt-0 md:w-full md:ml-2'>
                    {filters.map(filter => {
                      return (
                        <span key={filter}>
                                <a href="#" onClick={(e)=>{ toggleFilter(filter); filterOverride = filter; e.preventDefault() }}
                                     className={`font-semibold uppercase ${!haveSpecificFilter(filter) ? 'text-bluegreen' : 'text-purple' }`}>
                                        {filter}
                                </a>
                            </span>
                        )
                      })}
                    </div>
                    <a href="#" className="text-bluegreen md:ml-2" onClick={(e)=>{ reset(); e.preventDefault() }}
                      style={{visibility: !haveFilters ? 'hidden' : 'visible'}}><svg width="24px" height="24px"
                        viewBox="0 0 24 24">
                        <path  style={{fill: '#8D33D2'}} fillRule="evenodd"
                          d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z" />
                        </svg></a>
                </div>;
  
    return(<div>{menu}</div>);
  
  };

  const RenderPeople = (people: Person[]) => {
    return (
      people.length === 0 ?
      <p className='w-full text-xl my-20 text-center'>Sorry, no matches found. Please try other filters.</p> :
      <div className="lg:ml-5 grid gap-6 xl:grid-cols-4 md:grid-cols-2">
        <AnimatePresence>
          {people.map((person, i) => (  
            <Link href={`/about/community/${person.key}`} passHref key={person.key}>
              <a>
                <div className='flex flex-col mt-5'>
                    <div>
                        {person.image ?
                          <Image id={`thumb-${i}`} alt={`Thumbnail for person with name "${person.name}"`} imgId={person.image.publicId} width={300} transforms='f_auto,dpr_auto,c_thumb,g_face,ar_4:3' /> :
                          <svg viewBox="0 0 300 255" width="300" height="255" stroke="#000000" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#000000">
                            <title>{`Missing image of person with name "${person.name}"`}</title>
                            <path d="M 57.509 200 C 57.509 165.5 103.509 165.5 126.509 142.5 C 138.009 131 103.509 131 103.509 73.5 C 103.509 35.17 118.838 16 149.509 16 C 180.179 16 195.509 35.17 195.509 73.5 C 195.509 131 161.009 131 172.509 142.5 C 195.509 165.5 241.509 165.5 241.509 200" style={{stroke: 'rgb(141, 51, 210)', strokeOpacity: 0.36, strokeWidth: '7px'}}></path>
                          </svg>
                        }
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold text-coated'>{person.name}</h3>
                        <p className="mt-2 mb-8">{person.title}</p>
                        {/* <p className="text-purple">{person.tag}</p> */}
                        
                        {/* < {person.blurb && (
                          <p>
                          <span className="text-coated font-semibold">
                          What brings you here?
                          </span>
                          <br />
                          {person.blurb}
                          </p>
                          )}
                          {person.remembrance && (
                            <p className="text-purple font-semibold">
                            Engaged in remembrance of {person.remembrance}.
                            </p>
                          )}DocumentRenderer document={person.content.document} renderers={renderers} componentBlocks={BlockRenderers} /> */}
                    </div>
                </div>
              </a>
            </Link>
          ))}
        </AnimatePresence>
      </div>
    )
  };

  return (
    <Layout>
      <div className='container mt-14 mb-24 xl:mt-16 px-4 xl:px-8'>
          <h2 className="text-2xl text-bluegreen font-semibold">About Our Community</h2>
          <DocumentRenderer document={page.values.document} renderers={DocRenderers(rendererOverrides)} componentBlocks={BlockRenderers()} />
          <hr className='border-sorbet' />
          <h2 className="text-xl text-coated font-semibold mt-14 mb-12">Our Community</h2>
          {RenderFilters(['student', 'faculty', 'partner', 'staff' ])}
          <h3 className="text-lg font-extrabold text-purple mt-5">Current Participants</h3>
          {RenderPeople(filteredCurrentPpl)}
          <h3 className="text-lg font-extrabold text-purple mt-5">Previous Participants</h3>
          {RenderPeople(filteredPreviousPpl)}
      </div>
    </Layout>
    

  );
}

export async function getStaticProps() {
  const pageResult = await query(
    'communities',
    `communities(where: { name: { equals: "Community Page" } }) {
      values { 
        document 
      }
    }`);
  const peopleResult = await query(
    'people',
    `people(orderBy: {name: asc}, where: { enabled: { equals: true }}) {
      name 
      key
      currentlyActive
      title
      tag
      blurb
      remembrance
      image {
        publicId 
      } 
      content {
        document
      }
    }`);
    
  const page = pageResult[0] as CommunityPage;
  const currentPeople = (peopleResult as Person[]).filter(p=> p.currentlyActive);
  const previousPeople = (peopleResult as Person[]).filter(p=> !p.currentlyActive);
 
  return {
    props: {
      page,
      currentPeople,
      previousPeople,
    }
  };
}