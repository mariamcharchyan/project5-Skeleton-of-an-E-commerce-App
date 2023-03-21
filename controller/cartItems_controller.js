const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

function get_products(req, res) {
  db.all('SELECT * FROM cartItems', [], (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else if (!data || data.length === 0) {
          res.status(404).send('No products in cartItems found');
      } else {
          res.send(data);
      }
  })  
}

function add_product(req, res){
  const cart_id = req.body.cart_id;
  const product_id = req.body.product_id ;
  
  let sql = 'SELECT id, quantity FROM cartItems WHERE cart_id = ? AND product_id = ?';
  db.get(sql, [cart_id, product_id], (err, cartItem) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    } else if (!cartItem) {
      let sql = 'INSERT INTO cartItems (cart_id, product_id, quantity) VALUES (?, ?, ?)'
      db.run(sql, [cart_id, product_id, 1], function(err) {
        if (err) {
          return res.status(500).send('Internal Server Error');
        } else {
          return res.send('Product added to cart');
        }
      });
      } else {
      const newQuantity = cartItem.quantity + 1;
      let sql = 'UPDATE cartItems SET quantity = ? WHERE id = ?'
      db.run(sql, [newQuantity, cartItem.id], function(err) {
        if (err) {
          return res.status(500).send('Internal Server Error');
        } else {
          return res.send('Product quantity updated with +1');
        }
      });
      }
  });
}

function delete_product(req, res) {
  const cart_id = req.body.cart_id;
  const product_id = req.body.product_id;
  db.run('DELETE FROM cartItems WHERE (cart_id = ? AND product_id = ?)', [cart_id, product_id ], err => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Internal server error');
      
    }
    return res.send(`Product with id=${product_id} was deleted from cart with id=${cart_id}`);
  });
 
}

function patch_product(req, res){
  const id = req.params.id;
  const quantity = req.body.quantity;

  db.run('UPDATE cartItems SET quantity=? WHERE id = ?', [quantity, id], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating quantity');
    } else {
      res.send('Quantity updated');
    }
  })
}

module.exports = {
  get_products,
  add_product,
  delete_product,
  patch_product
}