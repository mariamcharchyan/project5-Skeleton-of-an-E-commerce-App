const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const users_schema = require('./models/users_schema')
const products_schema = require('./models/products_schema')
const carts_schema = require('./models/carts_schema')
const cartItems_schema = require('./models/cartItems_schema')
const products_routes = require('./routes/products_routes')
const users_routes = require('./routes/users_routes')
const mail_rout = require('./routes/mail_rout')
const cartItems_routes = require('./routes/cartItems_routes')
// const schema = require('./seed/seed')

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
      console.log("?sth rong wrong");
    }
    console.log('Connected to the database.');
  });
  
// schema.seed(db)

users_schema.create_users(db)
products_schema.create_products(db)
carts_schema.create_carts(db)
cartItems_schema.create_cartItems(db)

products_routes.get_products_route(app)
products_routes.get_product_id_route(app)
products_routes.post_product_route(app)
products_routes.delete_product_route(app)
products_routes.put_product_id(app)
products_routes.patch_protuct_id(app)

users_routes.get_users_route(app)
users_routes.register_user_route(app)
users_routes.login_user_route(app)

mail_rout.get_verify_user_route(app)

cartItems_routes.post_product(app)
cartItems_routes.get_products(app)
cartItems_routes.delete_product(app)
cartItems_routes.patch_product(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

