
exports.seed = async function(knex) {
await knex('users').insert([
  {username:'simo',password:'abc123',department:'student'}
])
  
};
