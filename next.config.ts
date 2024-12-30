import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['html', 'jsx', 'js', 'tsx', 'ts'],
  rewrites: async () => [
    {source: '/<route>/<file>', destination: './pages/api/static/<route>/<file>'},
  ],
};

export default nextConfig;
