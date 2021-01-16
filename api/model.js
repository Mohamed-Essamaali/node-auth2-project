const db = require('../data/config-db')


const find = ()=>{
    return db('users')
}
const findBy = credentials=>{
    return db('users').where(credentials).select('id','username','password')
}
const findById = id=>{
    return db('users').where('id',id)
}
const add = user =>{
    return db('users').insert(user)
}
// const remove = id=>{
//     return db('users').remove().where('id',id)
// }


module.exports = {find,findById,findBy,add}