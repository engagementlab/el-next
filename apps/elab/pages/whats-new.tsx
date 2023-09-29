import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { News, Event, Item, CustomEase } from '@/types';
import { Query } from '@el-next/components';
import { NewsEventRenderer } from '@/components/Renderers';

import Layout from '../components/Layout';

const groupButtonStyle = `flex items-center transition-all text-sm font-bold border-2 rounded-large px-3 py-1 text-green border-green hover:scale-110 hover:text-white hover:bg-green ${CustomEase}`;
export default function WhatsNew({
  items,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  let filter: string | null = null;
  if (router.asPath.indexOf('news') > 0) filter = 'news';
  else if (router.asPath.indexOf('events') > 0) filter = 'events';

  return (
    <Layout error={error}>
      <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
        <h2 className="text-5xl font-semibold mb-8">News & Events</h2>

        <h2 className="uppercase leading-10 text-grey text-xl font-bold">
          Filter By:
        </h2>
        <div className="flex flex-row items-center mt-3 mb-5 gap-x-5">
          {['News', 'Events'].map((str) => {
            return (
              <Link
                href={`/${str.toLocaleLowerCase()}`}
                key={`btn-${str.toLocaleLowerCase()}`}
                className={`${groupButtonStyle} ${
                  filter === str.toLocaleLowerCase()
                    ? 'bg-green text-white'
                    : ''
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
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const newsItems = await Query(
    'newsItems',
    `newsItems(
      where: {
          enabled: {
              equals: true
          },
      },
      orderBy: {
          publishDate: desc
      }		
    ) { 
        title
        key
        blurb {
          document
        }
        initiatives
        publishDate
        externalLink
        thumbnail { 
            publicId
        }
        thumbAltText
        summary
      }`
  );
  const events = await Query(
    'events',
    `events(
          where: {
            enabled: {
              equals: true
            }
          },
          orderBy: {
            eventDate: desc
          }) {
            name 
            key 
            initiatives
            eventDate 
            blurb {
              document
            }
            thumbnail {
              publicId
            }
            thumbAltText
            summary
          }`
  );

  if (events.error) {
    return {
      props: {
        error: events.error,
        events: null,
      },
    };
  }

  if (newsItems.error) {
    return {
      props: {
        error: newsItems.error,
        newsItems: null,
      },
    };
  }
  const mergedItems = (
    [...(events as Event[]), ...(newsItems as News[])] as Item[]
  )
    .sort((a, b) => {
      let val = 0;
      if (a.publishDate && b.publishDate)
        val = Date.parse(a.publishDate) - Date.parse(b.publishDate);
      else if (a.eventDate && b.eventDate)
        val = Date.parse(a.eventDate) - Date.parse(b.eventDate);
      else if (a.eventDate && b.publishDate)
        val = Date.parse(a.eventDate) - Date.parse(b.publishDate);
      else if (a.publishDate && b.eventDate)
        val = Date.parse(a.publishDate) - Date.parse(b.eventDate);

      return val;
    })
    .reverse();
  return {
    props: {
      items: mergedItems,
    },
    revalidate: 1,
  };
}
