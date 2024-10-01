import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Layout from '../../../components/Layout';
import * as Blog from '../../../public/blog.js';
import React from 'react';

export default ({ item }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title={`News Archive - ${item?.title}`}>
      {item && (
        <div className="min-h-screen w-full">
          <div className="bg-yellow/50 p-5 mb-5 w-1/2">
            Note: this article was previously part of our Medium publication.
            Please forgive any formatting oddities that may exist.
          </div>
          <h3 className="font-bold text-2xl">{item.title}</h3>

          <h4>
            {new Date(item.datePosted.$date).toLocaleDateString('en-US', {
              weekday: 'long',
            })}
            ,{' '}
            {new Date(item.datePosted.$date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}{' '}
          </h4>
          <div dangerouslySetInnerHTML={{ __html: item.body }} />
        </div>
      )}
    </Layout>
  );
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: Blog.default.map((path) => `/news/archive/${path.key}`),
    fallback: true,
  };
}

export function getStaticProps({ params }: GetStaticPropsContext) {
  return {
    props: {
      item: Blog.default.find((item) => item.key === params!.key),
    },
  };
}
