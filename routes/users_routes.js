const users_controller = require('../controller/users_controller')

function get_users_route(app){
    app.get('/users', users_controller.get_users)
}

function register_user_route(app){
    app.post('/register', users_controller.register_user)
}

function login_user_route(app){
    app.post('/login', users_controller.login_user)
}



module.exports = {
    get_users_route,
    register_user_route,
    login_user_route
}