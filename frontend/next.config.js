/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}


module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: 'empty',
      net: false,
      tls: false,

    };
    return config;
  },
};



module.exports = nextConfig

