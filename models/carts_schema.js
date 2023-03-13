const sql = ("CREATE TABLE IF NOT EXISTS carts (id INTEGER PRIMARY KEY, user_id INTEGER UNIQUE, FOREIGN KEY (user_id) REFERENCES users(id))");

function create_carts(my_database){
    my_database.run(sql)
}

module.exports = {create_carts};