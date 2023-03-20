const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

function add_product_to_cartItems(req, res){
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

module.exports = {add_product_to_cartItems}