import * as React from 'react';
import Link from 'next/link';
import { CustomEase, InitiativeFilterGroups, Item, Theming } from '@/types';
import { NewsEventRenderer } from './Renderers';

type Props = {
  items: Item[];
  filter?: string;
  initiative?: string;
};

const groupButtonStyle =
  'flex items-center transition-all text-sm font-bold border-2 rounded-large px-3 py-1';
const WhatsNewRenderer = ({
  items,
  filter,
  initiative,
}: Props): JSX.Element => {
  return (
    <>
      <h2 className="uppercase leading-10 text-grey text-xl font-bold">
        Filter By:
      </h2>
      <div className="flex flex-col md:flex-row gap-x-5 gap-y-2">
        {InitiativeFilterGroups.map((group) => {
          const groupButtonStyle = `flex items-center transition-all text-sm font-bold border-2 rounded-large px-3 py-1  
${
  group.key !== initiative
    ? `bg-white ${Theming[group.key].text}`
    : `text-white ${Theming[group.key].bg}`
}
 `;
          return (
            <>
              <div key={group.key} className="flex flex-row">
                {/* Hide group selector if other is selected */}
                <Link
                  href={
                    group.key === initiative
                      ? '/whats-new'
                      : `/initiatives/${group.key}/whats-new`
                  }
                  className={`inline-block transition-all ${CustomEase} ${
                    group.key !== initiative ? 'hover:scale-105' : ''
                  }`}
                >
                  <div className={groupButtonStyle}>
                    <span>{group.label}</span>
                    <svg
                      viewBox="185.411 115.41 11 11"
                      width="11"
                      height="11"
                      className={`flex-shrink-0 ml-3 ${
                        group.key !== initiative ? 'hidden' : 'block'
                      }`}
                    >
                      <path
                        d="M 195.198 115.41 L 190.911 119.695 L 186.624 115.41 L 185.411 116.623 L 189.696 120.91 L 185.411 125.197 L 186.624 126.41 L 190.911 122.125 L 195.198 126.41 L 196.411 125.197 L 192.126 120.91 L 196.411 116.623 Z"
                        className="fill-white"
                      ></path>
                    </svg>
                  </div>
                </Link>
              </div>
            </>
          );
        })}
      </div>
      <div className="flex flex-row items-center mt-3 mb-5 gap-x-5">
        {['News', 'Events'].map((str) => {
          const href = `/${
            initiative ? `initiatives/${initiative}/` : ''
          }${str.toLocaleLowerCase()}`;
          const className = `${groupButtonStyle} transition-all ${CustomEase} text-green border-green ${
            filter === str.toLocaleLowerCase()
              ? 'bg-green text-white'
              : 'hover:scale-105'
          }`;

          return (
            <Link href={href} className={className}>
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
              if (!filter) return true;
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
