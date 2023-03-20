require("dotenv").config();
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

function authenticateToken(req, res, next) {
    const token = req.headers.authorization
    console.log(token);
    if(token ==  null){
        return res.sendStatus(401)
    }
    jwt.verify(token, SECRET, (err, user)=>{
        if(err){
          return res.sendStatus(403)
      }
      next()
    })
}

module.exports = {authenticateToken};
