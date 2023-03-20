const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

function create_cart(email, res){
  db.get('SELECT * FROM users WHERE email=?',[email],(err, data) =>{
      const user_id = data.id;
      db.run('INSERT INTO carts (user_id) VALUES (?)', [user_id], function(err) {
          if (err) {
          return  res.status(500).send('Internal server error');
          } 
      })
  })
}

module.exports = {create_cart}




// app.post('/users/:userId/carts', (req, res) => {
//     const userId = req.params.userId;
  
//     db.run('INSERT INTO carts (user_id) VALUES (?)', [userId], function(err) {
//       if (err) {
//         console.log(err.message);
//         res.status(500).send('Internal server error');
//       } else {
//         const cartId = this.lastID;
//         res.status(201).json({ cartId: cartId });
//       }
//     });
//   });
  