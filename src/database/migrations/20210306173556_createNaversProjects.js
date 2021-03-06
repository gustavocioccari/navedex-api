
exports.up = function(knex) {
  return knex.schema.createTable('navers_projects', function(table){
    table.increments('id')
    
    table.integer('naver_id')
      .references('naver.id')
      .notNullable()
      .onDelete('CASCADE')

    table.integer('project_id')
      .references('project.id')
      .notNullable()
      .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('navers_projects')
};
