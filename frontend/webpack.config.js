const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'), // Changed 'dist' to 'build'
    filename: 'static/js/[name].[contenthash].js', // Better output filenames
    publicPath: '/', // Ensures correct routing for React
    clean: true, // Cleans the output directory before each build
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(svg|png|jpe?g|gif|webp)$/i, // Added more file types (e.g., png, jpeg)
        type: 'asset/resource', // Uses Webpack's asset/resource for file handling
        generator: {
          filename: 'static/media/[name].[contenthash][ext]', // Custom output path for images
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  devtool: prod ? 'source-map' : 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/assets/favicon.ico', // Add this line to handle the favicon
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: './public/assets', to: 'assets' },
        { from: './src/assets', to: 'assets' },
      ], // Copy assets to 'build/assets'
    }),
  ],
  devServer: prod
    ? undefined
    : {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      hot: true, // Enable hot module replacement
      liveReload: true,
      compress: true,
      port: 3000,
      historyApiFallback: true, // Enables React Router support
      host: '0.0.0.0',
      client: {
        progress: true,
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      open: true, // Automatically open in the browser
    },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
};
