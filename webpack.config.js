const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');


module.exports = {
  entry: ['./src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/dist/',
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.ProvidePlugin({ // inject ES5 modules as global vars
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),

    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    })
  ],

  module: {
    rules: [


      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use:

        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },



      },

      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']

      }



    ]
  }

};
