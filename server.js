const express = require('express');

const userRouter = require('./users/users-router');
const celebrityRouter = require('./celebrity/celebrity-router');

const configMiddleware = require('./config/configure-middleware');

const server = express();

configMiddleware(server);

server.use('/users', userRouter);
server.use('/celebrities', authenicate, celebrityRouter);

server.get('/', (req, res) => {
    res.json({ api: "API is working. Celebrities will Shine like Stars Here, Unless Extinguished Already!" })
});
module.exports = server;