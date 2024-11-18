const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config.js');
const { promises: fsp } = require('fs');
const { join } = require('path');

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {

  const settings = JSON.stringify({
    apiEndpoint: '0.0.0.0',
    region: 'ap-south-1',
  });

  await fsp.writeFile(
    join(__dirname, '..', 'public', 'settings.json'),
    settings,
  );

  console.log('Starting server...');
  await server.start();
};

runServer();
