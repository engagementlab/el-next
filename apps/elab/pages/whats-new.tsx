import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { Image, Query } from '@el-next/components';

import Layout from '../components/Layout';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { News, Event, Item } from '@/types';
import { useRouter } from 'next/router';

const groupButtonStyle =
  'flex items-center transition-all text-sm font-bold border-2 rounded-large px-3 py-1';
export default function WhatsNew({
  items,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  let filter: string | null = null;
  if (router.asPath === '/news') filter = 'news';
  else if (router.asPath === '/events') filter = 'events';

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
                className={`${groupButtonStyle} text-green border-green ${
                  filter === str.toLocaleLowerCase()
                    ? 'bg-green text-white'
                    : ''
                }`}
              >
                <span>{str}</span>
                {/* <svg
                        viewBox="185.411 115.41 11 11"
                        width="11"
                        height="11"
                        className={`flex-shrink-0 ml-3 ${
                          !haveGroupOpen(group.key) ? 'hidden' : 'block'
                        }`}
                        >
                        <path
                        d="M 195.198 115.41 L 190.911 119.695 L 186.624 115.41 L 185.411 116.623 L 189.696 120.91 L 185.411 125.197 L 186.624 126.41 L 190.911 122.125 L 195.198 126.41 L 196.411 125.197 L 192.126 120.91 L 196.411 116.623 Z"
                        className="fill-white"
                        ></path>0
                      </svg> */}
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
                let borderColor = 'border-yellow';
                if (item.initiatives[0] === 'gunviolence')
                  borderColor = 'border-purple';
                else if (item.initiatives[0] === 'climate')
                  borderColor = 'border-leaf';

                const ItemRenderer = ({ external }: { external?: boolean }) => {
                  return (
                    <>
                      <div className="relative">
                        {!filter && (
                          <div className="absolute right-4 top-4 p-2 bg-white rounded-full group">
                            {item.eventDate ? (
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
                                    <text x="8.321" y="18.097" fontSize=".5em">
                                      Event
                                    </text>
                                  </svg>
                                </span>
                                <svg
                                  height="30"
                                  viewBox="0 -960 960 960"
                                  width="30"
                                >
                                  <path
                                    fill="#444"
                                    d="M596.817-220Q556-220 528-248.183q-28-28.183-28-69T528.183-386q28.183-28 69-28T666-385.817q28 28.183 28 69T665.817-248q-28.183 28-69 28ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"
                                  />
                                </svg>
                              </div>
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
                                    <text x="8.321" y="18.097" fontSize=".5em">
                                      News
                                    </text>
                                  </svg>
                                </span>
                                <svg
                                  height="30"
                                  viewBox="0 -960 960 960"
                                  width="30"
                                >
                                  <path
                                    fill="#444"
                                    d="M140-120q-24 0-42-18t-18-42v-489h60v489h614v60H140Zm169-171q-24 0-42-18t-18-42v-489h671v489q0 24-18 42t-42 18H309Zm0-60h551v-429H309v429Zm86-131h168v-215H395v215Zm211 0h168v-88H606v88Zm0-127h168v-88H606v88ZM309-351v-429 429Z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        )}
                        <div>
                          {item.thumbnail ? (
                            <Image
                              id={`thumb-${i}`}
                              alt={item.thumbAltText}
                              transforms="f_auto,dpr_auto,c_fill,g_face,h_290,w_460"
                              imgId={item.thumbnail.publicId}
                              width={460}
                              maxWidthDisable={true}
                              className="w-full"
                            />
                          ) : (
                            <ImagePlaceholder
                              imageLabel="News"
                              width={335}
                              height={200}
                            />
                          )}
                        </div>
                        <hr
                          className={`border-b-[15px] transition-transform origin-bottom ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-600 scale-y-100 group-hover:scale-y-[200%] ${borderColor}`}
                        />
                      </div>

                      <h3 className="text-bluegreen hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-1">
                        {item.name || item.title}{' '}
                        {external && (
                          <svg
                            viewBox="0 0 20 20"
                            width="20"
                            height="20"
                            className="inline ml-1"
                          >
                            <g transform="matrix(0.042265, 0, 0, 0.042265, 0, 2)">
                              <g>
                                <path
                                  d="M266.422,0h-97.625c-9.65,0-17.5,7.851-17.5,17.5c0,9.649,7.85,17.5,17.5,17.5h55.377l-92.375,92.374   c-3.307,3.305-5.127,7.699-5.127,12.375c0,4.676,1.819,9.069,5.125,12.371c3.306,3.309,7.699,5.13,12.375,5.13   c4.674,0,9.069-1.82,12.376-5.127l92.374-92.375v55.377c0,9.649,7.851,17.5,17.5,17.5c9.649,0,17.5-7.851,17.5-17.5V17.5   C283.922,7.851,276.071,0,266.422,0z"
                                  className=" fill-bluegreen transition-all group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:fill-green-blue"
                                ></path>
                                <path
                                  d="M201.137,253.922H30V82.785h128.711l30-30H15c-8.284,0-15,6.716-15,15v201.137c0,8.284,6.716,15,15,15h201.137   c8.284,0,15-6.716,15-15V95.211l-30,30V253.922z"
                                  className=" fill-bluegreen transition-all group-hover:fill-green-blue"
                                ></path>
                              </g>
                            </g>
                          </svg>
                        )}
                      </h3>
                      <div className="">
                        {new Date(
                          item.publishDate ? item.publishDate : item.eventDate
                        ).toLocaleDateString('en-US', {
                          weekday: 'long',
                        })}
                        &nbsp;
                        {new Date(
                          item.publishDate ? item.publishDate : item.eventDate
                        ).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                        })}
                        &nbsp;
                        {new Date(
                          item.publishDate ? item.publishDate : item.eventDate
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                        })}
                      </div>
                      <p>
                        {item.summary.length > 150
                          ? `${item.summary.substring(
                              0,
                              item.summary.substring(0, 150).lastIndexOf(' ')
                            )}...`
                          : item.summary}
                      </p>
                    </>
                  );
                };
                return (
                  <div key={i}>
                    <div className="flex-shrink">
                      {item.externalLink ? (
                        <a className="group" href={item.externalLink}>
                          <ItemRenderer external={true} />
                        </a>
                      ) : (
                        <Link
                          href={`/${item.eventDate ? 'events' : 'news'}/${
                            item.key
                          }`}
                          className="group"
                        >
                          <ItemRenderer />
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
  ).sort((a, b) => {
    let val = 0;
    if (a.publishDate && b.publishDate)
      val = a.publishDate > b.publishDate ? 1 : -1;
    else if (a.eventDate && b.eventDate)
      val = a.eventDate > b.eventDate ? -1 : 1;
    else if (a.eventDate && b.publishDate)
      val = a.eventDate > b.publishDate ? -1 : 1;
    else if (a.publishDate && b.eventDate)
      val = a.publishDate > b.eventDate ? -1 : 1;
    return val;
  });
  return {
    props: {
      items: mergedItems,
    },
  };
}
