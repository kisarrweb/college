/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: { config: './tailwindcss-config.ts' },
  },
};

export default config;
