/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  images: {
    domains: ["ucarecdn.com"],
  },
};

module.exports = withContentlayer(nextConfig);
