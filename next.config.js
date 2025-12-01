/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Expose API Key to client if needed, or handle via server actions in future
    API_KEY: process.env.API_KEY,
  },
};

module.exports = nextConfig;