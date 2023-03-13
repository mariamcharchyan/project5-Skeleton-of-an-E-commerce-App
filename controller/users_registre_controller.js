const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const CryptoJS = require('crypto-js')

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
            res.send(JSON.stringify({status: 'Error Reigstering'}));
        }
        res.send(JSON.stringify({status: 'User Created'}));
    })
}

function login_user(req, res){
    const email = req.body.email
    const password = req.body.password
    const hashed_password = CryptoJS.SHA256(password).toString();
    
    db.get('SELECT * FROM users WHERE email = ?',[email], (err, data) => {
      if(email == data.email && hashed_password == data.password) {
          res.send(JSON.stringify({status: "Logged in"}));
      }else {
          res.send(JSON.stringify({status: "Wrong credentials"}));
      }
    }) 
  }

module.exports = {
    get_users,
    register_user,
    login_user
}