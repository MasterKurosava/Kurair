const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports={
  mode:"development",
  entry: ["@babel/polyfill","./src/index.jsx"],
  output:{
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
    publicPath: ""
  },
  devServer:{
    port:3000,
    historyApiFallback:true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins:[
    new HtmlWebpackPlugin({template:"./src/index.html"}),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use:{
          loader:'babel-loader',
          options:{
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules:{
                localIdentName: '[name]_[local]_[hash:base64:2]'
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,"css-loader"],
        exclude: /\.module\.css$/,
      },
      
      //imageRouting
      {
        test:/\.(jpg|jpeg|png|ico)/,
        use: [
          {
            loader:'file-loader',
            options:{ name:'[name].[ext]', outputPath:'./img/', publicPath:'./img/'}
          }
        ],
        exclude: [/\.int\.(png|jpg)$/, /\.act\.(png|jpg)$/, /\.comp\.(png|jpg)$/,/\.slider\.(png|jpg)$/, /_aSlider\.(png|jpg)$/]
      },
      {
        test:/\.int\.(png|jpg)$/,
        use: [
          { loader:'file-loader', options:{ name:'[name].[ext]', outputPath:'./img/integration/', publicPath:'./img/integration/'}}
        ]
      },
      {
        test:/\.act\.(png|jpg)$/,
        use: [
          {loader:'file-loader', options:{ name:'[name].[ext]', outputPath:'./img/activity/', publicPath:'./img/activity/'}}
        ]
      },
      {
        test:/\.comp\.(png|jpg)$/,
        use: [
          {loader:'file-loader',options:{ name:'[name].[ext]', outputPath:'./img/companies/', publicPath:'./img/companies/'}}
        ]
      },
      {
        test:/\.slider\.(png|jpg)$/,
        use: [
          {loader:'file-loader',options:{ name:'[name].[ext]', outputPath:'./img/slider/', publicPath:'./img/slider/'}}
        ]
      },
      {
        test:/_aSlider\.(png|jpg)$/,
        use: [
          {loader:'file-loader',options:{ name:'[name].[ext]', outputPath:'./img/aSlider/', publicPath:'./img/aSlider/'}}
        ]
      },
      {
        test:/\.(svg)$/,
        use: [
          {loader:'file-loader',options:{ name:'[name].[ext]', outputPath:'./svgs/', publicPath:'./svgs/'}}
        ]
      },
      {
        test:/\.(mp3)$/,
        use: [
          {loader:'file-loader',options:{ name:'[name].[ext]', outputPath:'./mp3/', publicPath:'./mp3/'}}
        ]
      },
      
      
      
    ],
  }
}