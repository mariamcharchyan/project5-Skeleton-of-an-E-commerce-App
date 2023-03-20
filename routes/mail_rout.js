const mail_controller = require('../controller/mail_controller')

// app.get('/verify/:code',)

function get_verify_user_route(app){
    app.get('/verify/:code', mail_controller.verify_user)
}

module.exports = {get_verify_user_route}