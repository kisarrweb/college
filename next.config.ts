import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  /* config options here */
  pageExtensions: ['html', 'jsx', 'js', 'tsx', 'ts'],
  rewrites: async () => [
    {source: '/<route>/<file>', destination: './pages/api/static/<route>/<file>'},
  ],
};

export default nextConfig; 
