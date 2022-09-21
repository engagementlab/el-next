import {
  InferGetStaticPropsType
} from 'next';
import {
  Image
} from '@el-next/components/image';

import create, {
  Mutate,
  GetState,
  SetState,
  StoreApi,
  UseBoundStore,
  State
} from 'zustand'
import {
  subscribeWithSelector
} from 'zustand/middleware'
import _ from 'lodash';
import {
  AnimatePresence
} from "framer-motion"

import Layout from '../../components/Layout';
import query from "../../apollo-client";
import {
  useRouter
} from 'next/router';

type CommunityPage = {
  values: any;
};

type Person = {
  name: string;
  tag: string;
  title: string;
  remembrance: string;
  blurb: string;
  image: any;
  content: any;
};

interface ItemRendererProps < T > {
  item: T;
  toggleFilter: (filter: string) => void;
}
type FilterState = {
  currentFilter: string;
  toggle: (filter: string) => void
  reset: () => void
}

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
      currentFilter: '',
      toggle: (filter: string) => set({
        currentFilter: filter
      }),
      reset: () => set({
        currentFilter: ''
      }),
    })));

// useStore.subscribe(state => state.currentFilter, (current) => {
//   console.log('current', current)
//   history.replaceState({}, 'Filtered Data', `${location.pathname}?${current}`);
// });
export default function Community({ page, people }: InferGetStaticPropsType<typeof getStaticProps>) {

  const router = useRouter();
  const toggleFilter = useStore(state => state.toggle);
  // const preSelectedFilter = Object.keys(router.query).length === 1 ? Object.keys(router.query)[0] : '';
  // let selectedFilter = filterOverride || (preSelectedFilter.length > 0 ? preSelectedFilter : '');
  // console.log('query',router.query, preSelectedFilter)

  // toggleFilter(selectedFilter)
  
  // Store get/set
  // if(filterOverride && (preSelectedFilter !== filterOverride))
  const selectedFilter = useStore(state => state.currentFilter);

  const haveFilters = selectedFilter.length > 0;
  console.log('selectedFilter',selectedFilter)
  const haveSpecificFilter = (key: string) => {
    return selectedFilter === key
  };
  const reset = useStore(state => state.reset);

    const filteredItems = people.filter(
        // If selected filters empty, show all...
        item => selectedFilter === '' ||
        // ...otherwise, item's tag must match selected filter
        item.tag === selectedFilter);
  const RenderFilters = (filters: string[]) => {
    
    const linkClass = 'no-underline border-b-2 border-b-[rgba(2,102,112,0)] hover:border-b-[rgba(2,102,112,1)] transition-all';
  
    const menu = <div className="flex justify-between">
                  {filters.map(filter => {
                      return (
                          <span key={filter} className={`text-lg xl:text-sm font-semibold my-8 xl:my-4
                              ${!haveSpecificFilter(filter) ? 'text-bluegreen' : 'text-purple' }`}>
                              <a href="#" onClick={(e)=>{ toggleFilter(filter); filterOverride = filter; e.preventDefault() }}
                                  className='w-full flex items-center justify-between'>
                                  <span className={!haveSpecificFilter(filter) ? linkClass : ''}>
                                      {filter}
                                  </span>
                              </a>
                          </span>
                      )
                  })}
                </div>;
  
    return(<div> 
            {/* Tablet portrait+ */}
            <div className="hidden lg:block">
                <div className="mr-4 flex justify-between">
                    <span>Filter:</span>
                    <a href="#" className="text-bluegreen" onClick={(e) =>{ reset(); e.preventDefault() }}  style={{visibility: !haveFilters ? 'hidden' : 'visible'}}>Clear</a>
                </div>
                {menu}
            </div>
        </div>);
  
  };
  return (
    <Layout>
      <div className='container mt-14 mb-24 xl:mt-16 px-4 xl:px-8'>
          {/* <div
          className="container mt-14 mb-14 xl:mt-16 px-4 xl:px-8">
              <h2 className="text-2xl text-bluegreen font-semibold">About Our Community</h2>
              <DocumentRenderer document={page.values.document} renderers={DocRenderers(rendererOverrides)} componentBlocks={BlockRenderers()} />
          </div> */}
          <h2 className="text-xl text-coated font-semibold mt-14 mb-12">Our Community</h2>
          {RenderFilters(['student', 'faculty', 'partner', 'staff' ])}
          <div className="lg:ml-5 grid gap-6 xl:grid-cols-4 lg:grid-cols-2">
              {/* <hr className='border-sorbet' /> */}
              <AnimatePresence>
                {filteredItems.map((person, i) => (
                  <div key={i} className='flex flex-col mt-5'>
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
                            <p className="text-purple">{person.tag}</p>
                            
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
                ))}
              </AnimatePresence>
          </div>
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
  const people = peopleResult as Person[];
 
  return {
    props: {
      page,
      people
    }
  };
}