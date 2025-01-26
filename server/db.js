const Pool = require("pg").Pool;


const pool = new Pool({
    user: "postgres",
    password: "BathTubL0bst3r",
    host: "localhost",
    port: 5432,
    database: "gymknight"
})

module.exports = pool;