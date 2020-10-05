const webpack = require('webpack');
const Html = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  node: {fs: 'empty', stream: 'empty'},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'},
      },
      {
        test: /\.pug$/,
        use: ['babel-loader', 'pug-as-jsx-loader'],
      },
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ],
      },
      {
        test: /\.html$/,
        use: [{loader: 'html-loader'}],
      },
    ],
  },
  plugins: [
    new Html({template: './src/index.html', filename: './index.html'}),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
};
