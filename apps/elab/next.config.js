/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: [
    {
      source: '/people/:path*',
      destination: '/about/people:path*',
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
