import { InferGetStaticPropsType } from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { Query } from '@el-next/components';
import { DefaultWhereCondition } from '@/types';
import Layout from '../components/Layout';
import { Blocks, Doc } from '@/components/Renderers';
import { ReactElement } from 'react';

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
              const bodyLength = item.body.document.length;
              let i = 0;
              return (
                <div>
                  &ldquo;
                  <DocumentRenderer
                    document={item.body.document}
                    componentBlocks={Blocks()}
                    renderers={Doc({
                      paragraph: (children: ReactElement[]) => {
                        i++;
                        return (
                          <>
                            {children.map((child: ReactElement) => {
                              return (
                                <span className="my-4 whitespace-pre-wrap">
                                  {child}

                                  {i / 2 === bodyLength && <>&rdquo;</>}
                                  {i / 2 <= bodyLength && (
                                    <>
                                      <br />
                                      <br />
                                    </>
                                  )}
                                </span>
                              );
                            })}
                          </>
                        );
                      },
                    })}
                  />
                  <p>&mdash;&nbsp;{item.attribution}</p>
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
