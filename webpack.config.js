const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js'
  },
  output: {
    path: path.join(__dirname + "/dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath(url) {
                return url.replace('../', '/assets/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disable'
    }),
    new WebpackPwaManifest({
      name: 'Food Event',
      short_name: 'Foodies',
      description: 'An app that allows you to view upcoming food events.',
      start_url: '../index.html',
      background_color: '#01579b',
      theme_color: '#ffffff',
      fingerprints: false,
      inject: false,
      ios: false,
      orientation: "portrait",
      display: "standalone",
      crossorigin: null,
      publicPath: null,
      includeDirectory: true,
      icons: [
        {
          src: path.resolve('assets/img/icons/icon-512x512.png'),
          sizes: [120, 152, 167, 180, 1024],
          destination: path.join('assets/icons', 'ios'),
          ios: true
        },
        {
          src: path.resolve('assets/img/icons/icon-512x512.png'),
          size: 1024,
          destination: path.join('assets/icons', 'ios'),
          ios: 'startup'
        },
        {
          src: path.resolve('assets/img/icons/icon-512x512.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
          destination: path.join('assets/icons', 'android')
        }
      ]
    })
  ],
  mode: 'development'
};

module.exports = config;
