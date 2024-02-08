import { InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import {
  News,
  Event,
  Item,
  Publication,
  Theme,
  DefaultWhereCondition,
} from '@/types';
import { Query } from '@el-next/components';

import Layout from '../components/Layout';
import Divider from '@/components/Divider';
import { Gutter } from '@/components/Gutter';
import { CTAButton } from '@/components/Buttons';
import _ from 'lodash';

export default function Publications({
  items,
  blurb,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // Reverse years order from _.groupBy
  const years = items
    ? Object.keys(items).sort(
        (a, b) => (b as unknown as number) - (a as unknown as number)
      )
    : [];
  return (
    <Layout error={error} fullBleed={true} title="Publications - Research">
      <div className="text-slate">
        <Gutter>
          <h1 className="m-6 font-extrabold text-4xl xl:text-6xl">
            Publications
          </h1>
          {blurb && (
            <div className="mx-6 w-full lg:w-1/2">
              <DocumentRenderer document={blurb.document} />
            </div>
          )}
        </Gutter>
        <Divider />
        <Gutter>
          <div className="flex flex-col mx-6">
            {items &&
              years.map((year: string) => {
                return (
                  <>
                    <h2 className="font-bold text-teal my-5">{year}</h2>
                    {items[year].map((item) => (
                      <>
                        <h3 className="text-yellow text-4xl font-bold mb-0 pb-0">
                          {item.title}
                        </h3>
                        <div className="text-2xl font-medium -mt-3">
                          <DocumentRenderer
                            document={item.citations.document}
                          />
                        </div>
                        <div className="flex flex-row gap-x-5 md:pl-10 mt-4 mb-16">
                          {item.buttons &&
                            item.buttons.length > 0 &&
                            item.buttons.map(
                              (button: {
                                url: string;
                                label: string;
                                icon: string | undefined;
                              }) => (
                                <CTAButton
                                  link={button.url}
                                  external={true}
                                  label={button.label}
                                  theme={2}
                                  icon={button.icon}
                                  iconClassName={
                                    button.icon !== 'arrow' &&
                                    button.icon !== 'book'
                                      ? 'max-w-[24px] scale-50 origin-left'
                                      : ''
                                  }
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
			${DefaultWhereCondition()},
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
  const blurb = await Query(
    'initiativesLanding',
    `initiativesLanding(where: { name: "Blurbs / Landing Pages" }) {
        publicationsBlurb {
          document
        }
      }`
  );

  if (blurb.error) {
    return {
      props: {
        error: blurb.error,
        blurb: null,
        publications: null,
      },
    };
  }

  return {
    props: {
      items: _.groupBy(publications, 'year') as unknown as {
        [key: string]: Publication[];
      },
      blurb: blurb.publicationsBlurb,
    },
    revalidate: 1,
  };
}
