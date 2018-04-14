const express = require('express');
const http = require('http');
const initWebSocket = require('./websocket');
const routes = require('./routes');
const path = require('path');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../public')));

// init routes
app.use(routes);

// init websockets
initWebSocket(server);

// start server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
