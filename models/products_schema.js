const sql = (`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    category TEXT, image TEXT,
    name TEXT,
    price REAL,
    description TEXT )`);

function create_products(my_database){
    my_database.run(sql)
}

module.exports = {create_products};