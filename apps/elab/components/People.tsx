import Link from 'next/link';
import { Person as PersonT } from '@/types';
import { Image } from '@el-next/components';
import { Variants, motion } from 'framer-motion';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { CustomEase, ThemeConfig } from '@/types';

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
      ease: [0.04, 0.62, 0.23, 0.98],
      duration: 0.6,
    },
  },
  exit: {
    display: 'none',
    opacity: 0,
    y: -40,
    height: 0,
    transition: {
      ease: [0.04, 0.62, 0.23, 0.98],
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
  index = 0,
  animate = true,
}: {
  person: PersonT;
  theme: ThemeConfig;
  index?: number;
  large?: boolean;
  animate?: boolean;
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
          <Image
            id={`placeholder-${person.key}`}
            alt="Person Placeholder image"
            imgId="elab-home-v3.x/people/person-placeholder"
            width={250}
          />
        )}
        <p
          className={`border-b-2 mt-3 ${theme.text} text-2xl font-semibold group-hover:border-b-0 group-hover:text-green-blue`}
        >
          {person.name}
        </p>
        <p className="text-md font-semibold mt-1">
          {person.title.replace(', Engagement Lab at Emerson College', '')}
        </p>
        {person.secondaryTitle && (
          <p className="text-sm mt-1 px-4">{person.secondaryTitle}</p>
        )}
      </Link>
    );
  return (
    <div className="flex flex-col items-center text-center ml-0 group lg:basis-1/4 xl:basis-1/5">
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
        <Image
          id={`placeholder-${person.key}`}
          alt="Person Placeholder image"
          imgId="elab-home-v3.x/people/person-placeholder"
          width={large ? 250 : 150}
        />
      )}
      <p className={`mt-3 ${theme.text} text-lg`}>{person.name}</p>
      {person.title && person.title.length > 0 && (
        <p className="text-sm font-semibold mt-1 px-2">{person.title}</p>
      )}
      {person.secondaryTitle && (
        <p className="text-sm mt-0 italic">{person.secondaryTitle}</p>
      )}
    </div>
    // </motion.div>
  );
};
export const PeopleList = ({
  heading,
  list,
  theme,
  index,
}: {
  heading: any;
  list: PersonT[];
  theme: ThemeConfig;
  index: any;
}): JSX.Element => {
  const { togglePeople, peopleOpen } = useStore((state) => state);

  const peopleSorted = list.sort((person1: PersonT, person2: PersonT) => {
    const person1Names = person1.name.split(' ');
    const person1NamesLength = person1.name.split(' ').length - 1;
    const person2Names = person2.name.split(' ');
    const person2NamesLength = person2.name.split(' ').length - 1;

    return person1Names[person1NamesLength].localeCompare(
      person2Names[person2NamesLength]
    );
  });

  return (
    <div className="flex flex-col">
      <h3
        className={`hidden lg:block text-xl font-extrabold uppercase mt-10 mb-4 ${theme.heading}`}
      >
        {heading}
      </h3>
      <div className="hidden flex-wrap my-4 gap-x-14 gap-y-5 lg:flex">
        {peopleSorted.map((person: PersonT) => (
          <Person key={person.key} person={person} theme={theme} />
        ))}
      </div>
      <div className="flex flex-col flex-wrap my-4 lg:hidden">
        <hr className={`border-1 ${theme.heading}`} />
        <button
          className="relative z-50 flex flex-row items-center uppercase mb-2"
          onClick={() => {
            togglePeople(index);
          }}
        >
          <h3 className={`text-lg font-medium uppercase my-4 ${theme.heading}`}>
            {heading}
          </h3>

          <svg
            className={`transition-all${CustomEase} duration-300 ${
              peopleOpen[index] ? 'rotate-180' : 'rotate-0 -translate-y-1 '
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

        <motion.div
          initial="exit"
          animate={peopleOpen[index] ? 'enter' : 'exit'}
          variants={subMenuAnimate}
          className="overflow-hidden"
        >
          {peopleSorted.map((person: PersonT, pi: number) => (
            <Person
              key={person.key}
              person={person}
              theme={theme}
              // index={pi}
              // animate={peopleOpen[index]}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
