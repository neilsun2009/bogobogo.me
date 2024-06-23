const CracoLessPlugin = require('craco-less');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('postcss-url')({
          url: (asset) => asset.url.replace('%PUBLIC_URL%', process.env.NODE_ENV === 'development' ? '' : process.env.PUBLIC_URL),
        }),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};