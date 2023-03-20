const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const CryptoJS = require('crypto-js')
const jwt_generate = require('../jwt/jwt_generate')
const mailer = require('../mailer/mailer')

function get_users(req, res) {
    db.all('SELECT * FROM users', [], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else if (!data || data.length === 0) {
            res.status(404).send('No users found');
        } else {
            res.send(data);
        }
   })
}

function register_user(req, res){
    const name = req.body.name;
    const surname = req.body.surname;
    const age = req.body.age;
    const gender = req.body.gender;
    const email = req.body.email;
    const password = req.body.password;
    const hashed_password = CryptoJS.SHA256(password).toString();
    let sql = 'INSERT INTO users (name, surname, age, gender, email, password) VALUES (?,?,?,?,?,?)';
    db.run(sql,[name, surname, age, gender, email, hashed_password], function(err){
        if(err){
            res.send(JSON.stringify({status: 'Error Registering'}));
        } else {
            
            let token = jwt_generate.generateAccessToken(email);
            mailer.send_Mail(email, token)

            const user_id = this.lastID;
            create_cart_for_user(user_id,res);
        }
    res.send(JSON.stringify({status: 'User Created'}));
    })
}

function create_cart_for_user(user_id, res) {
    db.run('INSERT INTO carts (user_id) VALUES (?)', [user_id], function(err) {
        if (err) {
            res.status(500).send('Internal server error');
        } 
        // else {
        //     const cart_id = this.lastID;
        //     res.status(201).json({ cart_id: cart_id });
        // }
    })
}

function login_user(req, res){
    const email = req.body.email
    const password = req.body.password
    const hashed_password = CryptoJS.SHA256(password).toString();
    let token = jwt_generate.generateAccessToken(email);
    db.get('SELECT * FROM users WHERE email = ?',[email], (err, data) => {
        // console.log(token);
      if(email == data.email && hashed_password == data.password) {
        res.status(201).json({status: "Logged in", jwt: token});
      }else {
        res.status(201).json({status: "Wrong credentials"});
      }
    }) 
  }

module.exports = {
    get_users,
    register_user,
    login_user
}