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
  rewrites: async () => {
    return [
      {
        source: '/news',
        destination: '/whats-new',
      },
      {
        source: '/events',
        destination: '/whats-new',
      },
    ];
  },
};

module.exports = nextConfig;
