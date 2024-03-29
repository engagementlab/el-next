/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  redirects: async () => {
    return [
      {
        source: '/people/:path*',
        destination: '/about/people/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
};

module.exports = nextConfig;
