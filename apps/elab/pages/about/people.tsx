import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Button, HeadingStyle, Image, Query, Video } from '@el-next/components';

import _ from 'lodash';

import Layout from '../../components/Layout';
import { Blocks, Doc } from '../../components/Renderers';
import { motion } from 'framer-motion';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactNode,
  ReactPortal,
} from 'react';
import CaptionedImage from '@/components/CaptionedImage';
import { PeopleList, Person } from '@/components/People';
import { Person as P, Theme, Theming } from '@/types';

export default function AboutPage({
  people,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error}>
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
        where: {
            enabled: {equals: true},
            category: {not: null} 
        }, 
        orderBy: {
            orderInSection: asc
        }) {
            name
            key
            title
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
  const people = itemResult as P[];

  return { props: { people } };
}
