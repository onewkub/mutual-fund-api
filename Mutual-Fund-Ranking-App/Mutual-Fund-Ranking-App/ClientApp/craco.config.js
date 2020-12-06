const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyvars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
