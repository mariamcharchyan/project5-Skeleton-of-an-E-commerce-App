const users_register_controller = require('../controller/users_registre_controller')

function get_users_route(app){
    app.get('/users', users_register_controller.get_users)
}

function register_user_route(app){
    app.post('/register', users_register_controller.register_user)
}
function login_user_route(app){
    app.post('/login', users_register_controller.login_user)
}


module.exports = {
    get_users_route,
    register_user_route,
    login_user_route
}