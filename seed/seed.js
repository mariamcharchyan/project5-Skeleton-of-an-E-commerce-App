const sqlite3 = require('sqlite3').verbose()
const database = new sqlite3.Database('../database.db')
const CryptoJS = require('crypto-js')

const products = [
    { category: 'girl', image: 'https1', name: 'image1', price: 111100, description: 'description1' },
    { category: 'boy', image: 'https2', name: 'image2', price: 11110, description: 'description2' },
    { category: 'girl', image: 'https3', name: 'image3', price: 11110, description: 'description3' },
    { category: 'girl', image: 'https4', name: 'image4', price: 11110, description: 'description4' },
    { category: 'boy', image: 'https5', name: 'image5', price: 11110, description: 'description5' },
    { category: 'boy', image: 'https6', name: 'image6', price: 11110, description: 'description6' },
];
  
const users = [
    {name: "Mariam", surname: "Charchyan", age: 27, gender: "female", email: "mariam@mail.com", is_verified: 1, status: "admin", password: "Mariam27"},
    {name: "Hasmik", surname: "Nalbandyan", age: 22, gender: "female", email: "hasmik@mail.com", is_verified: 1, status: "user", password: "Hasmik22" },
    {name: "Narek", surname: "Mkrtchyan", age: 33, gender: "male", email: "narek@mail.com", is_verified: 1, status: "user", password: "Narek33" },
    {name: "Aram", surname: "Hayrapetyan", age: 44, gender: "male", email: "aram@mail.com", is_verified: 1, status: "user", password: "Aram33" }
];

const carts = [
    { user_id: 2 },
    { user_id: 3 },
    { user_id: 4 }
];

const cartItems = [
    { cart_id: 1, product_id: 3, quantity: 1 },
    { cart_id: 1, product_id: 4, quantity: 3 },
    { cart_id: 1, product_id: 1, quantity: 1 },
    { cart_id: 2, product_id: 1, quantity: 2 },
    { cart_id: 2, product_id: 6, quantity: 3 },
    { cart_id: 2, product_id: 2, quantity: 1 },
    { cart_id: 3, product_id: 5, quantity: 6 },
    { cart_id: 3, product_id: 3, quantity: 1 },
    { cart_id: 3, product_id: 2, quantity: 4 }
];

async function seed() {
    try {
      await new Promise((resolve, reject) => {
        database.serialize(() => {
            // Drop tables if they exist
            database.run('DROP TABLE IF EXISTS cartItems');
            database.run('DROP TABLE IF EXISTS carts');
            database.run('DROP TABLE IF EXISTS products');
            database.run('DROP TABLE IF EXISTS users');
  
            // Create users table
            database.run('CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY, name TEXT, surname  TEXT, age  INTEGER, gender  TEXT, email TEXT, is_verified INTEGER DEFAULT 0, status TEXT DEFAULT "user", password TEXT)');
            users.map((user) =>{
                const hashedPassword = CryptoJS.SHA256(user.password).toString();
                database.run("INSERT INTO users (name, surname, age, gender, email, is_verified, status, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [user.name, user.surname, user.age, user.gender, user.email, user.is_verified, user.status, hashedPassword]);
            });
            
            // Create products table
            database.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, category TEXT, image TEXT, name TEXT, price REAL, description TEXT )');
            products.map((product) =>{
                database.run(`INSERT INTO products (category, image, name, price, description) VALUES (?, ?, ?, ?, ?)`, 
                             [product.category, product.image, product.name, product.price, product.description]);
            });
 
            // Create carts table
            database.run('CREATE TABLE IF NOT EXISTS carts (id INTEGER PRIMARY KEY, user_id INTEGER UNIQUE, FOREIGN KEY (user_id) REFERENCES users(id))');
            carts.map(cart => {
                database.run("INSERT INTO carts (user_id) VALUES (?)", [cart.user_id]);
            });

            // Create cartItems table
            database.run('CREATE TABLE IF NOT EXISTS cartItems (id INTEGER PRIMARY KEY,cart_id INTEGER, product_id INTEGER, quantity INTEGER, FOREIGN KEY (cart_id) REFERENCES carts(id), FOREIGN KEY (product_id) REFERENCES products(id))');
            cartItems.map(item => {
                database.run("INSERT INTO cartItems (cart_id, product_id, quantity) VALUES (?, ?, ?)",
                [item.cart_id, item.product_id, item.quantity]);
            });

            resolve();
        });
      });
  
      console.log('Seeding successful!');
    } catch (error) {
      console.error(`Seeding failed: ${error}`);
      throw error;
    }
    //  finally {
    //   database.close();
    // }
}
  
seed();