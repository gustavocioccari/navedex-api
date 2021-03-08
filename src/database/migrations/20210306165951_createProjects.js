
exports.up = function(knex) {
  return knex.schema.createTable('projects', function(table){
    table.increments('id')
    table.string('name').notNullable()
    
    table.integer('user_id')
    table.foreign('user_id')
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('projects')
};
