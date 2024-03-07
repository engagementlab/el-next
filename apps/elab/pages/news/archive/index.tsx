import Link from 'next/link';
import Layout from '../../../components/Layout';
import * as Blog from '../../../public/blog.js';

export default () => {
  return (
    <Layout title="News Archive">
      <div className="flex flex-col gap-y-5 min-h-screen w-full">
        {Blog.default
          .sort(
            (a, b) =>
              Date.parse(b.datePosted.$date) - Date.parse(a.datePosted.$date)
          )
          .map((item) => (
            <div>
              <Link href={`/news/archive/${item.key}`} className="group">
                <h3 className="text-grey text-3xl group-hover:text-green-blue">
                  {item.title}
                </h3>
                <h4>
                  {new Date(item.datePosted.$date).toLocaleDateString('en-US', {
                    weekday: 'long',
                  })}
                  ,{' '}
                  {new Date(item.datePosted.$date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </h4>
                <hr className="border-[1px] border-green-blue w-1/2 my-8" />
              </Link>
            </div>
          ))}
      </div>
    </Layout>
  );
};
