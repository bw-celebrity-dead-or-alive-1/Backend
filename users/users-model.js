const db = require('../data/dbConfig');

module.exports = {
    logged,
    add,
    find,
    findBy,
    findById,
    getAllUsers,
    getSingleUser,
    getAllAdmins,
    getSingleAdmin
}

function find() {
    return db('users').select('id', 'username', 'password', 'email', 'firstName', 'lastName', 'avatar')
}

function findBy(filter) {
    return db('users')
        .where(filter)
}

async function add(user) {
    const [id] = await db('users').insert(user)

    return findById(id)
}

function findById(id) {
    return db('users')
        .select('id', 'username')
        .where({ id })
        .first();
}

//need fuctionality for the 5 models below

function logged() {}

function getAllUsers() {

}

function getSingleUser() {}

function getAllAdmins() {}

function getSingleAdmin() {}