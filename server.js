const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
// const jwt = require('jsonwebtoken')
const users_schema = require('./models/users_schema')
const product_schema = require('./models/products_schema')
const carts_schema = require('./models/carts_schema')
const cartItems_schema = require('./models/cartItems_schema')
const users_routes = require('./routes/users_routes')
const users_register_controller = require('./routes/users_registre_routes')

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
      console.log("?sth rong wrong");
    }
    console.log('Connected to the database.');
  });

users_schema.create_users(db)
product_schema.create_products(db)
carts_schema.create_carts(db)
cartItems_schema.create_cartItems(db)

users_routes.get_products_route(app)
users_routes.get_product_id_route(app)
users_routes.post_product_route(app)
users_routes.delete_product_route(app)
users_routes.put_product_id(app)
users_routes.patch_protuct_id(app)

users_register_controller.get_users_route(app)
users_register_controller.register_user_route(app)
users_register_controller.login_user_route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

