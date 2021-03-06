
exports.up = function(knex) {
  return knex.schema.createTable('navers', function(table){
    table.increments('id')
    table.string('name').notNullable()
    table.date('birthdate').notNullable()
    table.date('admissiondate').notNullable()
    table.string('job_role').notNullable()
    
    table.integer('user_id')
    table.foreign('user_id')
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('navers')
};
