const sql = ("CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY, name TEXT, surname  TEXT, age  INTEGER, gender  TEXT, email TEXT, is_verified INTEGER DEFAULT 0, status TEXT DEFAULT 'user', password TEXT)");

//ադմինի համար sqlite3-um 'UPDATE users SET status = 'admin' WHERE id = 1';
function create_users(my_database){
    my_database.run(sql)
}

module.exports = {create_users};