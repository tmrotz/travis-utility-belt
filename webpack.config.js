const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    background: path.resolve(__dirname, 'src/components/background/index.js'),
    content: path.resolve(__dirname, 'src/components/content/index.js'),
    options: path.resolve(__dirname, 'src/components/options/index.js'),
    popup: path.resolve(__dirname, 'src/components/popup/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyWebpackPlugin([
      { from: 'src/manifest.json' },
      { from: 'src/assets' },
    ]),
    // new CopyWebpackPlugin([{
    //   from: 'src/manifest.json',
    //   transform: function (content, path) {
    //     // generates the manifest file using the package.json informations
    //     return Buffer.from(JSON.stringify({
    //       description: process.env.npm_package_description,
    //       version: process.env.npm_package_version,
    //       ...JSON.parse(content.toString())
    //     }))
    //   }
    // }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'components', 'options', 'index.html'),
      filename: 'options.html',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'components', 'popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  },
};
