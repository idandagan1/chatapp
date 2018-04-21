const express = require('express');
const http = require('http');
const path = require('path');
const debug = require('debug')('server');
const initWebSocket = require('./websocket');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);
const isProd = process.env.NODE_ENV === 'production';
const port = isProd ?
    +(process.env.PORT || 8080) + +process.env.NODE_APP_INSTANCE
    :8080; // unary (+) operator

app.use(express.static(path.join(__dirname, '../public')));
app.set('port', port);

// init routes
app.use(routes);

// init websockets
initWebSocket(server, isProd);

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${port}` : `port ${port}`;
    debug(`Listening on ${bind}`);
}

function onError(error) {
    if (error.syscall !== 'listen') { throw error; }
    switch (error.code) {
      case 'EACCES':
        process.exit(1);
        break;
      case 'EADDRINUSE':
        process.exit(1);
        break;
      default:
        throw error;
    }
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
