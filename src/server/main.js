import express from 'express';
import compression from 'compression';
import config from './config';
import errorHandler from './lib/errorHandler';
import frontend from './frontend/render';

const app = express();
app.use(compression());
app.use('/assets', express.static('build', { maxAge: '200d' }));
app.use(frontend);
app.get('*', errorHandler);

var server = require('http').createServer();
server.on('request', app);
server.listen(config.port, () => {
  console.log(`http server started at http://localhost:${config.port}`);
});

// if (config.storage === 'mongodb') {
//   let WebSocketServer = require('ws').Server;
//   let wss = new WebSocketServer({ server });
//   require('./api').default(wss);
// }