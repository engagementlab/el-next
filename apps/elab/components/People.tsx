import { Image } from '@el-next/components';
import { Variants, motion } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { ThemeConfig } from '@/types';
import Link from 'next/link';

interface State {
  peopleOpen: boolean[];
  togglePeople: (i: number) => void;
}

// Create store with Zustand
const useStore = create<State>()(
  subscribeWithSelector((set) => ({
    peopleOpen: [false, false, false, false],
    togglePeople: (i: number) =>
      set((state) => {
        // debugger;
        return {
          ...state,
          peopleOpen: state.peopleOpen.flatMap((section, ind) => {
            if (ind === i) return !section;
            return section;
          }),
        };
      }),
  }))
);
const subMenuAnimate: Variants = {
  enter: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: {
      ease: 'easeOut',
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    height: 0,
    transition: {
      duration: 0.15,
    },
    transitionEnd: {
      display: 'none',
    },
  },
};

export const Person = ({
  person,
  theme,
  large,
}: {
  person: {
    key: any;
    name: string;
    image: { publicId: string };
    title: string;
  };
  theme: ThemeConfig;
  large?: boolean;
}): JSX.Element => {
  if (large)
    return (
      <Link
        href={`/about/people/${person.key}`}
        className="flex flex-col items-center text-center ml-0 group basis-full md:basis-1/3"
      >
        {person.image && person.image.publicId ? (
          <Image
            id={`thumb-${person.key}`}
            alt={`Photo of ${person.name}`}
            imgId={person.image.publicId}
            width={250}
            transforms="f_auto,dpr_auto,c_fill,g_face,r_max,h_250,w_250"
            className={`rounded-full border-4 mt-2 transition-all ${theme.borderLight} group-hover:border-8`}
          />
        ) : (
          <ImagePlaceholder imageLabel="Person" width={250} height={250} />
        )}
        <p
          className={`border-b-2 mt-3 ${theme.text} text-2xl font-semibold group-hover:border-b-0 group-hover:text-green-blue`}
        >
          {person.name}
        </p>
        <p className="text-sm font-semibold mt-1">
          {person.title.replace(', Engagement Lab at Emerson College', '')}
        </p>
      </Link>
    );
  return (
    <div
      className="flex flex-col items-center text-center ml-0 group lg:basis-1/4 xl:basis-1/5"
      // key={`thumb-${person.key}`}
    >
      {person.image ? (
        <Image
          id={`thumb-${person.key}`}
          alt={`Photo of ${person.name}`}
          imgId={person.image.publicId}
          width={large ? 250 : 150}
          transforms={`f_auto,dpr_auto,c_fill,g_face,r_max,${
            large ? 'h_250,w_250' : 'h_150,w_150'
          }`}
          className={`rounded-full border-4 mt-2 transition-all ${theme.borderLight}`}
        />
      ) : (
        <ImagePlaceholder imageLabel="Person" width={150} height={150} />
      )}
      <p className={`border-b-2 mt-3 ${theme.text} text-lg`}>{person.name}</p>
      <p className="text-sm mt-1">{person.title}</p>
    </div>
  );
};
export const PeopleList = ({
  heading,
  list,
  theme,
  index,
}: {
  heading: any;
  list: any;
  theme: ThemeConfig;
  index: any;
}): JSX.Element => {
  const { togglePeople, peopleOpen } = useStore((state) => state);
  return (
    <div className="flex flex-col">
      <h3
        className={`hidden lg:block text-xl font-extrabold uppercase mt-10 mb-4 ${theme.heading}`}
      >
        {heading}
      </h3>
      <div className="hidden flex-wrap my-4 gap-x-14 gap-y-5 lg:flex">
        {list.map(
          (person: {
            key: any;
            name: string;
            image: { publicId: string };
            title: string;
          }) => (
            <Person key={person.key} person={person} theme={theme} />
          )
        )}
      </div>
      <div className="flex flex-col flex-wrap my-4 lg:hidden">
        <hr className={`border-1 ${theme.heading}`} />
        <h3 className={`text-lg font-medium uppercase my-4 ${theme.heading}`}>
          <button
            className="flex items-center uppercase mb-2"
            onClick={() => {
              togglePeople(index);
            }}
          >
            <p className="uppercase">{heading}</p>

            <svg
              className={`transition-all ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300 ${
                peopleOpen[index] ? 'rotate-180' : 'rotate-0'
              }`}
              height="40"
              viewBox="0 -960 960 960"
              width="40"
            >
              <path
                fill={theme.secodaryArrow}
                d="M 500 -280.021 L 280 -559 L 720 -559 L 500 -280.021 Z"
              ></path>
            </svg>
          </button>
          {/* <hr className={`border-1 ${theme.heading}`} /> */}
        </h3>

        <motion.div
          initial="exit"
          animate={peopleOpen[index] ? 'enter' : 'exit'}
          variants={subMenuAnimate}
        >
          {list.map(
            (person: {
              key: any;
              name: string;
              image: { publicId: string };
              title: string;
            }) => (
              <Person key={person.key} person={person} theme={theme} />
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};
