/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com'
      }
    ]
  },
  sassOptions: {
    silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api', 'mixed-decls']
  }
};

export default nextConfig;
