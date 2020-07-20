// const newRelic = require('newrelic');
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const app = express();
const port = 3000;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  app.use(express.static(path.join(__dirname, '../client')));
  app.use(bodyParser.json());
  app.use(cors());

  // app.use('/api', createProxyMiddleware({ target: 'http://52.14.226.255/', changeOrigin: true }));
  // app.use('/reviews', createProxyMiddleware({ target: 'http://18.224.95.187/', changeOrigin: true }));
  // app.use('/carousel', createProxyMiddleware({ target: 'http://54.215.84.53/', changeOrigin: true }));
  app.use('/api/:roomId/photo-gallery', createProxyMiddleware({ target: 'http://localhost:3004/', changeOrigin: true }));
  app.use('/api/:roomId/photo-gallery/save-status', createProxyMiddleware({ target: 'http://localhost:3004/', changeOrigin: true }));

  app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));
}
