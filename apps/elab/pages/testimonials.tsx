import { InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { Query } from '@el-next/components';
import { DefaultWhereCondition } from '@/types';
import Layout from '../components/Layout';
import { Blocks, Doc } from '@/components/Renderers';

export default function Testimonials({
  items,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error} title="Testimonials">
      <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
        <h1 className="font-extrabold text-black">Testimonials</h1>

        {items && (
          <div className="grid mt-5 lg:grid-cols-2 lg:gap-10">
            {items.map((item: { attribution: string; body: any }) => {
              return (
                <div>
                  <DocumentRenderer
                    document={item.body.document}
                    componentBlocks={Blocks()}
                    renderers={Doc()}
                  />
                  <p>
                    &mdash;&nbsp;
                    {item.attribution && item.attribution.length > 0
                      ? item.attribution
                      : 'Anonymous'}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const testimonials = await Query(
    'testimonials',
    `testimonials(
			${DefaultWhereCondition()},
      orderBy: {
          createdDate: desc
      }		
    ) { 
        body {
          document
        }
        attribution
      }`
  );

  if (testimonials.error) {
    return {
      props: {
        error: testimonials.error,
        testimonials: null,
      },
    };
  }

  return {
    props: {
      items: testimonials,
    },
    revalidate: 1,
  };
}
