const sql = ("CREATE TABLE IF NOT EXISTS cartItems (cart_id INTEGER, product_id INTEGER, quantity INTEGER, PRIMARY KEY (cart_id, product_id), FOREIGN KEY (cart_id) REFERENCES carts(id), FOREIGN KEY (product_id) REFERENCES products(id))");

function create_cartItems(my_database){
    my_database.run(sql)
}

module.exports = {create_cartItems};