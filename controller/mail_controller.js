const jwt = require('jsonwebtoken')
require("dotenv").config();
const SECRET = process.env.SECRET
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const carts_controller = require('./carts_controller')

function verify_user(req,res){
    const token = req.params.code
    const decoded= jwt.verify(token,SECRET)
    db.run('UPDATE users SET is_verified=1 WHERE email=?', [decoded.email], (err)=>{
        if(err){
            return res.send("err")
        } else {
            //create_cart_for_user
            const email = decoded.email;
            carts_controller.create_cart(email, res)
            // db.get('SELECT * FROM users WHERE email=?',[email],(err, data) =>{
            //     const user_id = data.id;
            //     db.run('INSERT INTO carts (user_id) VALUES (?)', [user_id], function(err) {
            //         if (err) {
            //         return  res.status(500).send('Internal server error');
            //         } 
            //     })
            // })
        }
        return res.send('Is verified. Now you can add products in your cart.')
    })
}

module.exports = {verify_user}
