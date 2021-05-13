const mysql = require('mysql2')

const connection = async function main() {
    // get the client
    const mysql = require('mysql2/promise');
    // get the promise implementation, we will use bluebird
    const bluebird = require('bluebird');
    // create the connection
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'vmo', multipleStatements:true, Promise: bluebird});
    // query database
    return connection
}

module.exports = connection;