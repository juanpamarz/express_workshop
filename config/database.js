const mysql = require('mysql2'); 

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pokemon'
});

// Esto habilita automáticamente el uso de async/await en tus rutas
module.exports = pool.promise();