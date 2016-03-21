var env = 'development';
var config = require("../knexfile")[env];
module.exports = require("knex")(config);