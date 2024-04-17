import { InferGetStaticPropsType } from 'next';
import { Query } from '@el-next/components';
import { DefaultWhereCondition } from '@/types';
import WhatsNewRenderer from '@/components/WhatsNew';
import Layout from '../components/Layout';

export default function WhatsNew({
  items,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error} title="News">
      <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
        {items && <WhatsNewRenderer items={items} filter="news" />}
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const newsItems = await Query(
    'newsItems',
    `newsItems(
			${DefaultWhereCondition()},
      orderBy: {
          publishDate: desc
      }		
    ) { 
        title
        key
        blurb {
          document
        }
        initiatives
        publishDate
        externalLink
        thumbnail { 
            publicId
        }
        thumbAltText
        summary
      }`
  );

  if (newsItems.error) {
    return {
      props: {
        error: newsItems.error,
        newsItems: null,
      },
    };
  }

  return {
    props: {
      items: newsItems,
    },
    revalidate: 1,
  };
}
