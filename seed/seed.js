const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const CryptoJS = require('crypto-js')

seed(db);

async function seed(my_database){
    //for users table
    await my_database.run("DROP TABLE IF EXISTS users",[],(err)=>{console.log(err);})
    await my_database.run("CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY, name TEXT, surname  TEXT, age  INTEGER, gender  TEXT, email TEXT, is_verified INTEGER DEFAULT 0, status TEXT DEFAULT 'user', password TEXT)")
    //add admin
    const passwordAdmin = "Mariam27";
    const hashedPasswordAdmin = CryptoJS.SHA256(passwordAdmin).toString();
    await my_database.run("INSERT INTO users (name, surname, age, gender, email, is_verified, status, password) VALUES ('Mariam', 'Charchyan', 27, 'female', 'mariamMail', 1, 'admin', ?)",[hashedPasswordAdmin])
    //add user1
    const passwordUser1 = "Hasmik22";
    const hashedPasswordUser1 = CryptoJS.SHA256(passwordUser1).toString();
    await my_database.run("INSERT INTO users (name, surname, age, gender, email, is_verified, status, password) VALUES ('Hasmik', 'Nalbandyan', 22, 'female', 'hasmikMail', 1, 'user', ?)",[hashedPasswordUser1])
    //add user2
    const passwordUser2 = "Narek33";
    const hashedPasswordUser2 = CryptoJS.SHA256(passwordUser2).toString();
    await my_database.run("INSERT INTO users (name, surname, age, gender, email, is_verified, status, password) VALUES ('Narek', 'Mkrtchyan', 33, 'male', 'narekMail', 1, 'user', ?)",[hashedPasswordUser2])


    //for products table
    await my_database.run("DROP TABLE IF EXISTS products")
    await my_database.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, category TEXT, image TEXT, name TEXT, price REAL, description TEXT )")
    //add products
    await my_database.run("INSERT INTO products (category, image, name, price, description) VALUES ('girl', 'https1', 'image1', 100, 'description1')");
    await my_database.run("INSERT INTO products (category, image, name, price, description) VALUES ('boy', 'https2', 'image2', 200, 'description2')");
    await my_database.run("INSERT INTO products (category, image, name, price, description) VALUES ('girl', 'https3', 'image3', 300, 'description3')");
    await my_database.run("INSERT INTO products (category, image, name, price, description) VALUES ('girl', 'https4', 'image4', 400, 'description4')");
    await my_database.run("INSERT INTO products (category, image, name, price, description) VALUES ('boy', 'https5', 'image5', 500, 'description5')");
    await my_database.run("INSERT INTO products (category, image, name, price, description) VALUES ('boy', 'https6', 'image6', 600, 'description6')");

    
    //for carts table
    await my_database.run("DROP TABLE IF EXISTS carts")
    await my_database.run("CREATE TABLE IF NOT EXISTS carts (id INTEGER PRIMARY KEY, user_id INTEGER UNIQUE, FOREIGN KEY (user_id) REFERENCES users(id))")
    //add cart for user
    await my_database.run("INSERT INTO carts (user_id) VALUES (2)");
    await my_database.run("INSERT INTO carts (user_id) VALUES (3)");
    
    //for cartItems table
    await my_database.run("DROP TABLE IF EXISTS cartItems")
    await my_database.run("CREATE TABLE IF NOT EXISTS cartItems (id INTEGER PRIMARY KEY,cart_id INTEGER, product_id INTEGER, quantity INTEGER, FOREIGN KEY (cart_id) REFERENCES carts(id), FOREIGN KEY (product_id) REFERENCES products(id))")
    //add items
    await my_database.run("INSERT INTO cartItems (cart_id, product_id, quantity) VALUES (1, 3, 1)");
    await my_database.run("INSERT INTO cartItems (cart_id, product_id, quantity) VALUES (1, 4, 3)");
    await my_database.run("INSERT INTO cartItems (cart_id, product_id, quantity) VALUES (1, 1, 1)");
    await my_database.run("INSERT INTO cartItems (cart_id, product_id, quantity) VALUES (2, 1, 2)");
    await my_database.run("INSERT INTO cartItems (cart_id, product_id, quantity) VALUES (2, 6, 3)");
    await my_database.run("INSERT INTO cartItems (cart_id, product_id, quantity) VALUES (2, 2, 1)");
}

module.exports = {seed}
