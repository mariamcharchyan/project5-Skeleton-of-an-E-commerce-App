const sql = ("CREATE TABLE IF NOT EXISTS cartItems (id INTEGER PRIMARY KEY,cart_id INTEGER, product_id INTEGER, quantity INTEGER, FOREIGN KEY (cart_id) REFERENCES carts(id), FOREIGN KEY (product_id) REFERENCES products(id))");

function create_cartItems(my_database){
    my_database.run(sql)
}

module.exports = {create_cartItems};