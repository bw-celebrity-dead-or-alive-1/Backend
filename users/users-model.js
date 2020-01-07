const db = require('../data/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove
    
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

async function remove(id) {
    const [id] = await db('users').delete(user)

    return findById(id)
}

// //need fuctionality for the 4 models below


// function getAllUsers() {

// }

// function getSingleUser() {
//     return db('users').where()
// }

// function getAllAdmins() {}

// function getSingleAdmin() {}