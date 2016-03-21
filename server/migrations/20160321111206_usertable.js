exports.up = function(knex, Promise) {
  return Promise.all([
	knex.schema.createTable("users", function(table){
		table.increments('id').nullable().primary();
	    table.string('username')
	    table.string('zip');
	    table.string('email');
	    table.string('password');
	    table.string('senator1');
	    table.string('senator1cid');
	    table.string('senator2');
	    table.string('senator2cid');
	    table.string('houserep');
	    table.string('houserepcid')
  	}),
  	knex.schema.createTable('legislatorsByAssociation', function(table){
  		table.string('username').references('username').inTable("users")
  		table.string('bioguide_id');
  		table.string('cid');
  	})])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable("users"),
		knex.schema.dropTable("photos")
	])
};