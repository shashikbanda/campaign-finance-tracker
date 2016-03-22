exports.up = function(knex, Promise) {
  return Promise.all([
	knex.schema.createTable("users", function(table){
		//table.increments('id').nullable()
	    table.string('username').primary();
	    table.string('password');
	    table.string('zip');
	    
  	}),
  	knex.schema.createTable('legislatorsByAssociation', function(table){
  		table.string('username').references('username').inTable("users")
  		table.string('first_name');
  		table.string('last_name');
  		table.string('state_name');
  		table.string('party');
  		table.string('crp_id');
  		table.string('bioguide_id');
  	})])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable("users"),
		knex.schema.dropTable("photos")
	])
};