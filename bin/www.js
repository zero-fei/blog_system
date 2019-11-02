const http = require('http');

const PORT = 10001;

const  serverHandle = require('../app');

const server = http.createServer(serverHandle);
server.listen(PORT);
