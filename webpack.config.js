const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MergeJsonPlugin = require('merge-json-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  devServer: {
    static: './dist',
    open: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|otf|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MergeJsonPlugin({
      force: true,
      groups: [
        {
          files: [
              'src/configs/data-visualizations/charts/pie.json2',
              'calendar-heat-map.json'
          ],
          transform: (outputJson) => { console.log(`JSON 3 IS ${JSON.stringify(outputJson)}`); return outputJson; },
        },
        {
          transform: (outputJson) => { console.log(`JSON 2 IS ${JSON.stringify(outputJson)}`); return outputJson; },
          pattern: 'src/**/**/*.json', // glob. see https://github.com/mrmlnc/fast-glob
          to: './data-visualizations.json',
        },
      ],
    }),
    // CopyWebpackPlugin is used to copy the Monaco Editor's workers and other assets to the output directory
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'node_modules/monaco-editor/min/vs'),
          to: 'vs',
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
