exports.up = function(knex, Promise) {
  return Promise.all([
	knex.schema.createTable("users", function(table){
		table.increments('id').nullable().primary();
	    table.string('username');
	    table.string('zip');
	    table.string('email');
	    table.string('password');
  	})])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable("users"),
		knex.schema.dropTable("photos")
	])
};