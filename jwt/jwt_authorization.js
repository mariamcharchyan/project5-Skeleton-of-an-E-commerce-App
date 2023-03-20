require("dotenv").config();
const jwt = require('jsonwebtoken')
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('database.db')

function checkStatusAdmin(req,res,next){
    const token=req.headers.authorization
    const decoded=jwt.decode(token)
    // console.log(decoded);
    const email = decoded.email
    db.get('SELECT * FROM users WHERE email = ?',[email], (err, data) => {
      console.log(data);
      if(data.status != "admin") {
        return res.sendStatus(403)
        }
        next()
    })
}

module.exports = {checkStatusAdmin};



// function authenticateToken(req, res, next){
//     const token= req.headers.authorization
//     if(token ==  null){
//         return res.sendStatus(401)
//     }
//     jwt.verify(token, SECRET, (err, user)=>{
//         if(err){
//             return res.sendStatus(403)
//         }
//         const {role} = user
//         if(role != "admin"){
//             return res.sendStatus(403)
//         }
//         next()
//     })
// }

// function checkRole(req, res){
//     const token = req.headers.authorization
//     const decoded = jwt.decode(token)
//     const role = decoded.role
//    
// }