/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/people/:path*',
        destination: '/about/people/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
