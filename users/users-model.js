const db = require('../data/dbConfig');

module.exports = {
    add,
    find,
    get,
    findBy,
    findById,
    add,
    remove,
    update,
    getUserScores,
    getAllAdmins,
    getSingleAdmin
    
}

function find() {
    return db('users').select('id', 'username', 'password', 'email', 'firstName', 'lastName', 'avatar')
}

function get() {
    !id
      ? db("users")
          .limit(lim)
          .offset(off)
      : db("users")
          .where({ id })
          .first();
}

function getUserScores(id) {
    return db  
            .select(
                's.score',
                's.user_id',
                's.id',
                'u.email',
                'u.name',
                's.created_at'
                 )       
            .from('scores as s')
            .join('users as u', 's.user_id', 'u.id')
            .where('u.id', id)
            .orderBy('score', 'desc');
                
}
function findBy(filter) {
    return db('users')
        .where(filter)
}



function getAllAdmins(filter) {
   db("users").select('id', 'username', 'role')
    .where({role} === 'admin')

    return filter
}

function getSingleAdmin(id) {
  return db("users")
    .select("id", "username")
    .where({ id } && ({role} === "admin"))
    .first();
}

function add(user) {
     return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id); 
    })
}

function findById(id) {
    return db('users')
        .select('id', 'username')
        .where({ id })
        .first();
}

function update(id, changes) {
  db('users')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

 async function remove(id){
  try {
    const user = await get(id);
    if (user) {
      await db('users')
        .where({ id })
        .del();
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};