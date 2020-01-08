const express = require('express');

const userRouter = require('./users/users-router');
const celebrityRouter = require('./celebrity/celebrity-router');

const configMiddleware = require('./middleware/configure-middleware');

const server = express();

configMiddleware(server);


//users is blank so the endpoint can be /register or /login
server.use('/users', userRouter);

server.use('/celebrities', celebrityRouter);

server.get('/', (req, res) => {
    res.json({ api: "API is working. Celebrities will Shine like Stars Here, Unless Extinguished Already!" })
});
module.exports = server;