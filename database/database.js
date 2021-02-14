const knex = require("knex")({
    client: "mysql2",
    connection: {
      host : "localhost",
      user : "root",
      password : "zasdw",
      database : "marketproducts"
    }
  });

module.exports = knex