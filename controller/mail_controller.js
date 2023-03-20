const jwt = require('jsonwebtoken')
require("dotenv").config();
const SECRET = process.env.SECRET
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')


function verify_user(req,res){
    const token = req.params.code
    const decoded= jwt.verify(token,SECRET)
    db.run('UPDATE users SET is_verified=1 WHERE email=?', [decoded.email], (err)=>{
        if(err){
            res.send("err")
        }
        res.send('Verified')
    })
}

module.exports = {verify_user}
