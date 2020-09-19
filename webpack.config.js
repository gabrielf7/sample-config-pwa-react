const WEBPACK = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


plugins = [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.join(__dirname, 'src/index.html')
  }),
  new MiniCssExtractPlugin({
    filename: "styles.css"
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }));
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  mode: 'development', // mode: 'development'  , 'production', 'none'
  entry: path.join(__dirname, 'src/index.jsx'),
  output: {
    filename: 'index_bundle.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: [".js",".jsx"]
  },
  performance: {
    hints: false
  },
  plugins: plugins,
  module: {       
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              "presets": [
                ["@babel/preset-env", {
                  "modules": false
                }], "@babel/react"
              ]
            }  
          }
        ]
      },
      {
        test: /\.(jpe?g|ico|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader?name=img/[name].[ext]'
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
      },
    ],
  },
  devServer: {
    publicPath: "/",
    contentBase: "./dist"
  }
};