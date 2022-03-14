import { InferGetStaticPropsType } from 'next';
import Script from 'next/script'

import { query } from '.keystone/api';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { InferRenderersForComponentBlocks } from '@keystone-6/fields-document/component-blocks';
import Image from '../../components/Image';
import { componentBlocks } from '../../admin/components/component-blocks';


type Studio = {
  id: string;
  content: any;
  name: string;
  videos: any[];
};

const componentBlockRenderers: InferRenderersForComponentBlocks<typeof componentBlocks> = {
  image: (props: any) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Image id={'img-' + props.image.data.image.publicId} alt={props.image.data.altText} imgId={props.image.data.image.publicId}  />
      </div>
    );
  },
};

// Home receives a `studios` prop from `getStaticProps` below
export default function Home({ studios }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <main>
       
          {studios.map((studio, i) => (
              <div key={i}>
                <h1 className="text-3xl">{studio.name}</h1>
                <DocumentRenderer key={i} document={studio.content.document} 
                componentBlocks={componentBlockRenderers} />

                {studio.videos.map((video, v) => (
                  <div key={v} className='video'>
                    <p>{video.label}</p>
                    <div id={"video-embed-"+v}>
                        <iframe
                            src={video.value}
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                      <Script src="https://player.vimeo.com/api/player.js"></Script>
                    </div>
                  </div>
                ))}
              </div>
          ))}
       </main>
    </div>
  );
}

export async function getStaticProps() {
  const studios = await query.Studio.findMany({ query: 'id name content { document(hydrateRelationships: true) } videos' }) as Studio[];
  console.log(studios[0].content.document[0].children[0].children[0].children
    )
  return {
    props: {
      studios
    }
  };
}