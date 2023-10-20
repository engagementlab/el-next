import { InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { News, Event, Item, Publication, Theme } from '@/types';
import { Query } from '@el-next/components';

import Layout from '../components/Layout';
import Divider from '@/components/Divider';
import { Gutter } from '@/components/Gutter';
import { CTAButton } from '@/components/Buttons';
import _ from 'lodash';

// type PublicationsGrouped = {
//   [year: string]: Publication[];
// };

export default function Publications({
  items,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error} fullBleed={true}>
      <div className="text-slate">
        <Gutter>
          <h1 className="m-6 font-extrabold text-4xl xl:text-6xl">
            Publications
          </h1>
        </Gutter>
        <Divider />
        <Gutter>
          <div className="flex flex-col mx-6">
            {items &&
              Object.keys(items).map((year: string) => {
                return (
                  <>
                    <h2>{year}</h2>
                    {items[year].map((item) => (
                      <>
                        <h2 className="text-yellow text-4xl font-bold">
                          {item.title}
                        </h2>
                        <div className="text-2xl font-medium">
                          <DocumentRenderer
                            document={item.citations.document}
                          />
                        </div>
                        <div className="flex flex-row gap-x-5 md:pl-10 my-4">
                          {item.buttons.map(
                            (button: {
                              url: string;
                              label: string;
                              icon: string | undefined;
                            }) => (
                              <CTAButton
                                link={button.url}
                                label={button.label}
                                theme={2}
                                icon={button.icon}
                                className={`flex flex-row gap-x-3 items-center fill-teal`}
                              />
                            )
                          )}
                          {item.relatedProject && (
                            <CTAButton
                              link={`/research/projects/${item.relatedProject.key}`}
                              label="Go to project"
                              theme={2}
                              icon="arrow"
                              className={`flex flex-row gap-x-3 items-center fill-teal`}
                            />
                          )}
                        </div>
                      </>
                    ))}
                  </>
                );
              })}
            {/* </> */}
          </div>
        </Gutter>
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const publications = await Query(
    'publications',
    `publications(
          where: {
            enabled: {
              equals: true
            }
          },
          orderBy: {
            year: desc
          }) {
            title 
            key 
            year
            citations {
                document
            }
            buttons
            relatedProject {
              key
            }
    }`
  );
  if (publications.error) {
    return {
      props: {
        error: publications.error,
        publications: null,
      },
    };
  }

  return {
    props: {
      items: _.groupBy(publications, 'year') as unknown as {
        [key: string]: Publication[];
      },
    },
    revalidate: 1,
  };
}
