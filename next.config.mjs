/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      /* config options here */
      pageExtensions: ['html', 'jsx', 'js', 'tsx', 'ts'],
    //   rewrites: async () => [
    //     {source: '/<route>/<file>', destination: './pages/api/static/<route>/<file>'},
    //   ],
};

// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, {
    org: "davegray",
    project: "repairshop",

    // An auth token is required for uploading source maps.
    authToken: process.env.SENTRY_AUTH_TOKEN,

    silent: false, // Can be used to suppress logs

    hideSourceMaps: true,

    disableLogger: true,
});
