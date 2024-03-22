import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Query } from '@el-next/components';

import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { Person } from '@/components/People';
import { DefaultWhereCondition, Person as PersonT, Theming } from '@/types';

export default function AboutPage({
  people,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      error={error}
      title="People"
      description="Learn about our faculty, staff, and students."
    >
      {people && (
        <>
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-grey"
          >
            <h1 className="m-6 font-extrabold text-4xl xl:text-6xl text-slate">
              People
            </h1>

            <h3
              className={`text-3xl font-extrabold uppercase mt-10 mb-4 ml-6 ${Theming['none'].heading}`}
            >
              Core Team
            </h3>
            <div className="flex-wrap my-4 gap-y-5 flex">
              {people
                .filter((person) => {
                  return person.category === 'core';
                })
                .map((person: PersonT) => (
                  <Person
                    key={person.key}
                    person={person}
                    theme={Theming['none']}
                    large={true}
                  />
                ))}
            </div>
            <h3
              className={`text-3xl font-extrabold uppercase mt-24 mb-4 ml-6 ${Theming['none'].heading}`}
            >
              Student Staff
            </h3>
            <div className="flex-wrap my-4 gap-y-5 flex">
              {people
                .filter((person) => {
                  return person.category === 'studentstaff';
                })
                .map(
                  (person: {
                    key: any;
                    name: string;
                    image: { publicId: string };
                    title: string;
                  }) => (
                    <Person
                      key={person.key}
                      person={person}
                      theme={Theming['none']}
                      large={true}
                    />
                  )
                )}
            </div>
            <h3
              className={`text-3xl font-extrabold uppercase mt-24 mb-4 ml-6 ${Theming['none'].heading}`}
            >
              Fellows
            </h3>
            <div className="flex-wrap mt-4 mb-20 gap-y-5 flex">
              {people
                .filter((person) => {
                  return person.category === 'fellow';
                })
                .map((person: PersonT) => (
                  <Person
                    key={person.key}
                    person={person}
                    theme={Theming['none']}
                    large={true}
                  />
                ))}
            </div>
          </motion.div>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'people',
    `people(
        ${DefaultWhereCondition('category: {not: null}')},
        orderBy: {
            orderInSection: asc
        }) {
          name
          key
          title
          secondaryTitle
          image {
              publicId
          }
          category
    }`
  );
  if (itemResult.error) {
    return {
      props: {
        error: itemResult.error,
        item: null,
      },
    };
  }
  const people = itemResult as PersonT[];

  return { props: { people }, revalidate: 1 };
}
