const cartItems_controller = require('../controller/cartItems_controller')
const jwt_authentication = require('../jwt/jwt_authentication')
const jwt_authorization = require('../jwt/jwt_authorization')

function get_products(app){
    app.get('/cartItems/get', 
    jwt_authentication.authenticateToken,
    jwt_authorization.checkStatusUser,
    cartItems_controller.get_products)
}

function post_product(app){
    app.post('/cartItems/post', 
    jwt_authentication.authenticateToken,
    jwt_authorization.checkStatusUser,
    cartItems_controller.add_product)
}

function delete_product(app){
    app.delete('/cartItems/delete', 
    jwt_authentication.authenticateToken,
    jwt_authorization.checkStatusUser,
    cartItems_controller.delete_product)
}


function patch_product(app){
    app.patch('/cartItems/patch/:id', 
    jwt_authentication.authenticateToken,
    jwt_authorization.checkStatusUser,
    cartItems_controller.patch_product)
}
module.exports = {
    get_products,
    post_product,
    delete_product,
    patch_product
}