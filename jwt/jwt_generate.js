require("dotenv").config();
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

function generateAccessToken(email) {
  return jwt.sign({email}, SECRET, { expiresIn: '36000s' });
}

module.exports = {generateAccessToken};