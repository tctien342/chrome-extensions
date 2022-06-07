/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

const CracoAlias = require('craco-alias');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { join } = require('path');

const extraEntry = {
  content: { import: join(__dirname, 'src/content.ts'), filename: '[name].js' },
  background: { import: join(__dirname, 'src/background.ts'), filename: '[name].js' },
};

module.exports = {
  webpack: {
    plugins: {
      add: [
        // Copy assets and manifest files
        new CopyWebpackPlugin({
          patterns: [{ from: './manifest.json' }, { from: './src/assets' }],
        }),
      ],
    },
    configure: (webpackConfig) => {
      webpackConfig.plugins = webpackConfig.plugins.map((plugin) => {
        if (plugin.constructor.name === 'HtmlWebpackPlugin') {
          // Only add script tag for popup in index.html
          plugin.userOptions.excludeChunks = Object.keys(extraEntry);
        }
        if (plugin.constructor.name === 'MiniCssExtractPlugin') {
          // Keep content css name
          plugin.options.filename = ({ chunk }) => {
            if (chunk.name === 'main') return 'static/css/[name].[contenthash:8].css';
            return `${chunk.name.replace('/js/', '/css/')}.css`;
          };
        }
        return plugin;
      });

      // Bind app, content and background script
      webpackConfig.entry = {
        main: join(__dirname, 'src/index.tsx'),
        ...extraEntry,
      };

      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: './',
        /* tsConfigPath should point to the file where "baseUrl" and "paths" 
        are specified*/
        tsConfigPath: 'tsconfig.json',
      },
    },
  ],
};
