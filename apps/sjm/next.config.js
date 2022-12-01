/** @type {import('next').NextConfig} */
const withPreconstruct = require('@preconstruct/next');
const nextConfig = withPreconstruct({
  reactStrictMode: true,
  images: {
    domains: ['i.vimeocdn.com'],
    loader: 'custom',
  },
  trailingSlash: true,
});

module.exports = nextConfig;
