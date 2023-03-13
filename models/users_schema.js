const sql = ("CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY, name TEXT, surname  TEXT, age  INTEGER, gender  TEXT, email TEXT, password TEXT)");

function create_users(my_database){
    my_database.run(sql)
}

module.exports = {create_users};