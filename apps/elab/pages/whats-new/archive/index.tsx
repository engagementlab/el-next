import Link from 'next/link';
import Layout from '../../../components/Layout';
import * as Blog from '../../../public/blog.js';
import * as Events from '../../../public/events.js';
import { CustomEase } from '@/types';
import { create } from 'zustand';
type Item = {
  _id: {
    $oid: string;
  };

  datePosted: {
    $date: string;
  };
  date: {
    $date: string;
  };
  html: string;
  event_key?: string;
  eventUrl: string;
  hackpadURL: string;
  key: string;
  name?: string;
  title?: string;
  shortDescription: string;
  createdAt?: undefined;
  __v?: undefined;
  images?: undefined;
  videoId?: undefined;
  videoThumbnail?: undefined;
};

type FilterState = {
  filter: string;
  setFilter: (filter: string) => void;
};

const useStore = create<FilterState>((set) => ({
  filter: 'none',
  setFilter: (filter) => set(() => ({ filter })),
}));

const groupButtonStyle =
  'flex items-center transition-all text-sm font-bold border-2 rounded-large px-3 py-1';

export default () => {
  const { filter, setFilter } = useStore();
  return (
    <Layout title="News Archive">
      <div className="flex flex-row items-center mt-3 mb-5 gap-x-5">
        {['News', 'Events'].map((str) => {
          const className = `${groupButtonStyle} transition-all ${CustomEase} text-green border-green ${
            filter === str.toLowerCase()
              ? 'bg-green text-white'
              : 'hover:scale-105'
          }`;

          return (
            <button
              onClick={() => setFilter(str.toLowerCase())}
              className={className}
            >
              <span>{str}</span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-y-5 min-h-screen w-full">
        {([...Events.default, ...Blog.default] as unknown as Item[])
          .sort((a, b) => {
            let val = 0;
            if (a.date && b.date)
              val = Date.parse(b.date.$date) - Date.parse(a.date.$date);
            else if (a.datePosted && b.datePosted)
              val =
                Date.parse(b.datePosted.$date) - Date.parse(a.datePosted.$date);
            else if (a.datePosted && b.date)
              val = Date.parse(b.date.$date) - Date.parse(a.datePosted.$date);
            else if (a.date && b.datePosted)
              val =
                Date.parse(b.datePosted.$date) - Date.parse(a.datePosted.$date);

            return val;
          })
          .map((item) => {
            if (
              filter === 'none' ||
              (!item.name && filter === 'news') ||
              (item.name && filter === 'events')
            )
              return (
                <Link
                  href={
                    item.name
                      ? `/events/archive/${item.key}`
                      : `/news/archive/${item.key}`
                  }
                  className="group"
                >
                  <h3 className="text-grey text-3xl group-hover:text-green-blue">
                    {item.name ? item.name : item.title}
                    <div className="relative inline-block ml-3">
                      {item.name ? (
                        <>
                          <span className="absolute -top-10 -left-1 scale-0 translate-y-4 transition-all group-hover:scale-100 group-hover:translate-y-0">
                            <svg
                              viewBox="3 6.317 41 24.354"
                              width="41"
                              height="24.354"
                            >
                              <path d="M 44 6.878 C 44 6.568 43.633 6.317 43.18 6.317 L 3.82 6.317 C 3.367 6.317 3 6.568 3 6.878 L 3 25.898 C 3 26.207 3.367 26.459 3.82 26.459 L 18.229 26.459 L 22.858 30.459 C 23.013 30.593 23.249 30.671 23.5 30.671 C 23.751 30.671 23.987 30.593 24.142 30.459 L 28.771 26.459 L 43.18 26.459 C 43.633 26.459 44 26.207 44 25.898 L 44 6.878 Z M 42.36 25.336 L 28.375 25.336 C 28.124 25.336 27.889 25.415 27.733 25.548 L 23.5 29.206 L 19.267 25.548 C 19.111 25.415 18.876 25.336 18.625 25.336 L 4.64 25.336 L 4.64 7.44 L 42.36 7.44 L 42.36 25.336 Z"></path>
                              <path
                                d="M 23.513 29.203 L 18.842 25.289 L 28.198 25.284 L 23.513 29.203 Z M 4.613 7.434 L 42.398 7.434 L 42.398 25.39 L 4.613 25.39 L 4.613 7.434 Z"
                                style={{ fill: 'white' }}
                              ></path>
                            </svg>
                            <div className="absolute top-0 left-[5px] text-xs text-grey font-semibold">
                              Event
                            </div>
                          </span>
                          <svg height="30" viewBox="0 -960 960 960" width="30">
                            <path
                              fill="#444"
                              d="M596.817-220Q556-220 528-248.183q-28-28.183-28-69T528.183-386q28.183-28 69-28T666-385.817q28 28.183 28 69T665.817-248q-28.183 28-69 28ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"
                            />
                          </svg>
                        </>
                      ) : (
                        <div className="relative">
                          <span className="absolute -top-10 -left-1 scale-0 translate-y-4 transition-all text-xs text-grey font-semibold group-hover:scale-100 group-hover:translate-y-0">
                            <svg
                              viewBox="3 6.317 41 24.354"
                              width="41"
                              height="24.354"
                            >
                              <path d="M 44 6.878 C 44 6.568 43.633 6.317 43.18 6.317 L 3.82 6.317 C 3.367 6.317 3 6.568 3 6.878 L 3 25.898 C 3 26.207 3.367 26.459 3.82 26.459 L 18.229 26.459 L 22.858 30.459 C 23.013 30.593 23.249 30.671 23.5 30.671 C 23.751 30.671 23.987 30.593 24.142 30.459 L 28.771 26.459 L 43.18 26.459 C 43.633 26.459 44 26.207 44 25.898 L 44 6.878 Z M 42.36 25.336 L 28.375 25.336 C 28.124 25.336 27.889 25.415 27.733 25.548 L 23.5 29.206 L 19.267 25.548 C 19.111 25.415 18.876 25.336 18.625 25.336 L 4.64 25.336 L 4.64 7.44 L 42.36 7.44 L 42.36 25.336 Z"></path>
                              <path
                                d="M 23.513 29.203 L 18.842 25.289 L 28.198 25.284 L 23.513 29.203 Z M 4.613 7.434 L 42.398 7.434 L 42.398 25.39 L 4.613 25.39 L 4.613 7.434 Z"
                                style={{ fill: 'white' }}
                              ></path>
                            </svg>
                            <div className="absolute top-0 left-[5px] text-xs text-grey font-semibold">
                              News
                            </div>
                          </span>
                          <svg height="30" viewBox="0 -960 960 960" width="30">
                            <path
                              fill="#444"
                              d="M140-120q-24 0-42-18t-18-42v-489h60v489h614v60H140Zm169-171q-24 0-42-18t-18-42v-489h671v489q0 24-18 42t-42 18H309Zm0-60h551v-429H309v429Zm86-131h168v-215H395v215Zm211 0h168v-88H606v88Zm0-127h168v-88H606v88ZM309-351v-429 429Z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </h3>
                  <h4>
                    {new Date(
                      item.datePosted ? item.datePosted.$date : item.date.$date
                    ).toLocaleDateString('en-US', {
                      weekday: 'long',
                    })}
                    ,{' '}
                    {new Date(
                      item.datePosted ? item.datePosted.$date : item.date.$date
                    ).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </h4>
                  <hr className="border-[1px] border-green-blue w-1/2 my-8" />
                </Link>
              );
          })}
      </div>
    </Layout>
  );
};
