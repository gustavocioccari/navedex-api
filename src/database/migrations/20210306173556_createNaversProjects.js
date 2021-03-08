
exports.up = function(knex) {
  return knex.schema.createTable('navers_projects', function(table){
    table.increments('id')
    
    table.integer('naver_id')
    table.foreign('naver_id')
          .references('id')
          .inTable('navers')
          .onDelete('CASCADE')
    
    table.integer('project_id')
    table.foreign('project_id')
    .references('id')
    .inTable('projects')
    .onDelete('CASCADE')    
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('navers_projects')
};
