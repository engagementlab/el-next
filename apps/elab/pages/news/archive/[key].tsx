import Link from 'next/link';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Layout from '../../../components/Layout';
import * as Blog from '../../../public/blog.js';

export default ({ item }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title={`News Archive - ${item?.title}`}>
      {item && (
        <div className="min-h-screen w-full">
          <div className="bg-yellow/50 p-5 w-1/4">
            Note: this article was previously part of our Medium publication.
            Please forgive any formatting oddities that may exist.
          </div>
          <h3>{item.title}</h3>
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
