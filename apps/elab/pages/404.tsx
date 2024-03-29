import Link from 'next/link';
import Layout from '../components/Layout';

export default () => {
  return (
    <Layout title="Not Found">
      <div className="flex flex-col items-center gap-y-5 min-h-screen w-full text-center">
        <svg viewBox="1 1 124.999 124.997" width="124.999" height="124.997">
          <path
            d="M 45.433 113.662 C 36.573 122.532 22.173 122.537 13.298 113.662 C 8.748 109.117 6.573 103.131 6.678 97.181 C 6.783 91.506 8.968 85.851 13.298 81.521 L 35.208 59.346 L 31.188 55.331 L 9.283 77.506 C 3.843 82.941 1.108 90.046 1.003 97.181 C 0.893 104.592 3.633 112.032 9.283 117.682 C 14.823 123.227 22.093 125.997 29.368 125.997 C 36.638 125.997 43.913 123.227 49.453 117.682 L 71.359 95.506 L 67.344 91.486 L 45.433 113.662 Z M 97.479 81.441 L 118.569 87.096 L 120.039 81.601 L 98.949 75.956 L 97.479 81.441 Z M 87.439 91.486 L 102.879 106.927 L 106.894 102.906 L 91.459 87.471 L 87.439 91.486 Z M 75.924 98.981 L 81.569 120.077 L 87.059 118.607 L 81.409 97.511 L 75.924 98.981 Z M 29.178 45.286 L 8.088 39.631 L 6.618 45.121 L 27.708 50.771 L 29.178 45.286 Z M 81.529 13.335 C 90.399 4.455 104.799 4.46 113.674 13.335 C 122.554 22.21 122.554 36.601 113.674 45.476 L 91.459 67.381 L 95.474 71.396 L 117.684 49.496 C 123.229 43.951 125.999 36.676 125.999 29.405 C 125.999 22.13 123.229 14.865 117.684 9.32 C 112.149 3.775 104.554 1 97.294 1 C 90.019 1 83.049 3.775 77.514 9.32 L 55.293 31.22 L 59.308 35.24 L 81.529 13.335 Z M 39.223 35.24 L 23.783 19.8 L 19.763 23.82 L 35.208 39.256 L 39.223 35.24 Z M 45.253 29.215 L 39.598 8.12 L 45.088 6.65 L 50.743 27.745 L 45.253 29.215 Z"
            data-bx-origin="0.496005 0.5"
          ></path>
        </svg>
        <div>
          <h1 className="text-4xl text-red font-semibold">Hmmm...</h1>
          <p className="text-xl font-semibold">
            Sorry, but the page you're looking for could not be found. Please
            try{' '}
            <Link href="/" className="border-b-2 border-b-yellow">
              going home
            </Link>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
};
