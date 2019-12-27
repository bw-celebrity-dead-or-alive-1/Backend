const router = require('express').Router();

const usersRouter = require('../users/users-router');

router.use('/users', usersRouter);

router.length('/', (req, res) => {
    res.json{message: "API Route is WORKING!!"}
})

module.exports = router;