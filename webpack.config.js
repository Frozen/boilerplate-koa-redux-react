const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);


var MAXLAND_BUNDLE = '/Users/kot/projects/maxland/main/static/js';

const entry = path.resolve(ROOT_PATH,'app/src/index')

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map',
  entry: process.env.NODE_ENV === 'production' ? [entry] : [
    'webpack-dev-server/client?http://localhost:8080',
    //'webpack/hot/only-dev-server',
    entry
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        //loaders: process.env.NODE_ENV === 'production' ? [] : ['eslint'],
        loaders: process.env.NODE_ENV === 'production' ? [] : [],
        include: path.resolve(ROOT_PATH, './app')
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    },
    {
      test: /\.scss$/,
      loaders: ['style','css','sass']
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: process.env.NODE_ENV === 'production' ? MAXLAND_BUNDLE : path.resolve(ROOT_PATH, 'app/build'),
    publicPath: 'http://localhost:8080/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'app/build'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    //,
    //new HtmlwebpackPlugin({
    //  title: 'React BoilerPlate'
    //})
  ]
};