import * as React from 'react';
import Link from 'next/link';
import { Item } from '@/types';
import { NewsEventRenderer } from './Renderers';

type Props = {
  items: Item[];
  filter?: string;
};

const groupButtonStyle =
  'flex items-center transition-all text-sm font-bold border-2 rounded-large px-3 py-1';
const WhatsNewRenderer = ({ items, filter }: Props): JSX.Element => {
  return (
    <>
      <h2 className="text-5xl font-semibold mb-8">News & Events</h2>
      <h2 className="uppercase leading-10 text-grey text-xl font-bold">
        Filter By:
      </h2>
      <div className="flex flex-row items-center mt-3 mb-5 gap-x-5">
        {['News', 'Events'].map((str) => {
          return (
            <Link
              href={`/${str.toLocaleLowerCase()}`}
              className={`${groupButtonStyle} text-green border-green ${
                filter === str.toLocaleLowerCase() ? 'bg-green text-white' : ''
              }`}
            >
              <span>{str}</span>
            </Link>
          );
        })}
        {filter && (
          <Link
            href="/whats-new"
            className="text-grey text-base uppercase leading-6 opacity-70"
          >
            CLEAR FILTERS
          </Link>
        )}
      </div>
      <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:grid-cols-2 lg:gap-2 text-grey">
        {items &&
          items
            .filter((item) => {
              if (filter === null) return true;
              else if (filter === 'news' && item.publishDate) return true;
              else if (filter === 'events' && item.eventDate) return true;
            })
            .map((item: Item, i: number) => {
              return (
                <div key={i}>
                  <div className="flex-shrink">
                    {item.externalLink ? (
                      <a className="group" href={item.externalLink}>
                        <NewsEventRenderer
                          item={item}
                          i={i}
                          external={true}
                          showIcon={!filter}
                        />
                      </a>
                    ) : (
                      <Link
                        href={`/${item.eventDate ? 'events' : 'news'}/${
                          item.key
                        }`}
                        className="group"
                      >
                        <NewsEventRenderer
                          item={item}
                          i={i}
                          external={false}
                          showIcon={!filter}
                        />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};
export default WhatsNewRenderer;
