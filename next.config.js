/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["storage.googleapis.com"],
    minimumCacheTTL: 1500000,
  },
};

module.exports = nextConfig;
