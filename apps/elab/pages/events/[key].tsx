import { ReactNode } from 'react';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { HeadingStyle } from '@el-next/components';
import { Image, Query } from '@el-next/components';

import Layout from '../../components/Layout';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import { Blocks, Doc } from '../../components/Renderers';

import { Event, Theme, Theming } from '@/types';
import { CTAButton } from '@/components/Buttons';
const rendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    const customRenderers = {
      4: 'font-semibold text-[18px] text-coated',
    };
    return HeadingStyle({ level, children, textAlign, customRenderers });
  },
};

export default function Event({
  item,
  date,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  let theme = Theme.none;
  if (item) {
    if (item.initiatives && item.initiatives.length > 0) {
      if (item.initiatives[0] === 'gunviolence') theme = Theme.gunviolence;
      else if (item.initiatives[0] === 'climate') theme = Theme.climate;
    }
  }
  return (
    <Layout
      error={error}
      breadcrumbs={[{ label: 'Back to News & Events', href: '/whats-new' }]}
    >
      {item && (
        <div className="mt-14">
          <div className="flex flex-col xl:flex-row gap-8 px-4 xl:px-8">
            <div className="w-full xl:w-1/2 flex-shrink-0">
              {item.thumbnail ? (
                <Image
                  id="header-img"
                  alt={item.thumbAltText}
                  imgId={item.thumbnail.publicId}
                />
              ) : (
                <ImagePlaceholder
                  imageLabel="Header"
                  width={1280}
                  height={350}
                />
              )}
            </div>

            <div className="flex flex-col">
              <h1 className="text-coated text-4xl font-extrabold mt-5">
                {item.name}
              </h1>
              <div className="text-coated font-medium my-5">{`${new Date(
                item.eventDate
              ).toLocaleDateString('en-US', {
                weekday: 'long',
              })}, ${new Date(item.eventDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}, ${new Date(item.eventDate).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}`}</div>
              {item.address && (
                <div className="text-coated font-medium">
                  <a
                    href={`https://www.google.com/maps?q=${item.address.replaceAll(
                      '\n',
                      ' '
                    )}`}
                    target="_blank"
                    className="border-b-2 border-b-yellow"
                  >
                    {item.address}
                  </a>

                  <DocumentRenderer
                    document={item.blurb.document}
                    componentBlocks={Blocks()}
                    renderers={Doc()}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="px-4 xl:px-8 mt-10">
            <DocumentRenderer
              document={item.content.document}
              componentBlocks={Blocks()}
              renderers={Doc(rendererOverrides)}
            />
            {item.registrationLink &&
              new Date(item.eventDate) >= new Date() && (
                <CTAButton
                  label="RSVP Today"
                  link={item.registrationLink}
                  theme={theme}
                />
              )}
            {/*  {relatedItems &&
                    <div>
                    <h3 className='text-2xl text-bluegreen font-semibold'>Explore Related Media</h3>
                    <div>
                        <div className='flex flex-col lg:flex-row justify-between items-center'>
                            <p>Browse similar Studio courses from the same course series, professor, or media.</p>
                            <Link href='/media-archive' passHref>
                                <a>
                                    See All
                                </a>
                            </Link>
                        </div>
                        <div className='flex flex-col lg:flex-row'>
                            {relatedItems.map((relatedItem, i) => (
                            <Link key={i} href={`/media/${relatedItem.key}`} passHref>
                            <a className="w-full lg:w-1/3">
                            <div>
                            <Image id={`thumb-${i}`} alt={`Thumbnail for media with name "${relatedItem.name}"`} imgId={relatedItem.thumbnail.publicId} width={302}  />
                            <h4 className='text-xl font-semibold mt-3'>{relatedItem.name}</h4>
                            
                            <p>{_.map(relatedItem.filters, 'name').join(', ')}</p>
                            </div>
                            </a>
                            </Link>
                            ))}
                        </div>
                    </div>
                    </div>
                } */}
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = await Query(
    'events',
    `events(where: { enabled: { equals: true } }),
     {
      key
     }`
  );

  if (items.error) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const paths = (items as { key: string }[])
    .filter(({ key }) => !!key)
    .map(({ key }) => `/events/${key}`);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'events',
    `events(where: { key: { equals: "${params!.key}" } }) {
       name
       blurb { document }
       eventDate
       address
       registrationLink
       initiatives
       content { 
           document 
       }
       thumbAltText
       thumbnail { 
           publicId 
       }
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

  const item = itemResult[0] as Event;
  const date = `${new Date(item.eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
  })}, ${new Date(item.eventDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}, ${new Date(item.eventDate).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  return { props: { item, date }, revalidate: 1 };
}
