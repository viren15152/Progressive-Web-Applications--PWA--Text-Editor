const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Add HtmlWebpackPlugin to generate HTML file
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),

      // Add WebpackPwaManifest to generate manifest file
      new WebpackPwaManifest({
        name: 'J.A.T.E',
        short_name: 'J.A.T.E',
        description: 'Just Another Text Editor',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: path.resolve('src/assets/icons/icon_96x96.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            purpose: 'any maskable',
          },
        ],
        start_url: '.',
        display: 'standalone',
      }),
    ],

    module: {
      rules: [
        // Add CSS loader rule
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        // Add Babel loader rule for JavaScript files
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};


