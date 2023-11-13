const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtReloader = require('webpack-ext-reloader');
const { join, resolve } = require('path');

const extraEntry = {
  main: join(__dirname, 'src/index.tsx'),
  content: join(__dirname, 'src/content.ts'),
  background: join(__dirname, 'src/background.ts'),
};

module.exports = {
  entry: {
    ...extraEntry,
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Support for tailwindCSS
          'postcss-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
        exclude: /node_modules/,
        include: [resolve(__dirname, 'src')],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: {
        // The entries used for the content/background scripts or extension pages
        contentScript: 'content',
        background: 'background',
        extensionPage: 'main',
      },
    }),
    new MiniCssExtractPlugin(),
    // Copy assets and manifest files
    new CopyWebpackPlugin({
      patterns: [
        { from: './manifest.json' },
        { from: './src/assets' },
        { from: './public/index.html' },
      ],
    }),
  ],
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },
};
