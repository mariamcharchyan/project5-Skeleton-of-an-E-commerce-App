const products_controller = require('../controller/products_controller')
const jwt_authentication = require('../jwt/jwt_authentication')
const jwt_authorization = require('../jwt/jwt_authorization')

function get_products_route(app){
    app.get('/products', products_controller.get_products)
}

function get_product_id_route(app){
    app.get('/product/:id',products_controller.get_product_id)
}

function post_product_route(app){
    app.post('/products',
    jwt_authentication.authenticateToken,
    jwt_authorization.checkStatusAdmin,
    products_controller.post_product)
}

function delete_product_route(app){
    app.delete('/product/delete/:id',
    jwt_authentication.authenticateToken,
    jwt_authorization.checkStatusAdmin,
    products_controller.delete_product_id)
}

function put_product_id(app){
    app.put('/product/update/:id',
    jwt_authentication.authenticateToken,
    jwt_authorization.checkStatusAdmin,
    products_controller.put_product_id)
}

function patch_protuct_id(app){
    app.patch('/product/update/:id',
    jwt_authentication.authenticateToken,
    jwt_authorization.checkStatusAdmin,
    products_controller.patch_protuct_id)
}


module.exports = {
    get_products_route,
    get_product_id_route,
    post_product_route,
    delete_product_route,
    put_product_id,
    patch_protuct_id
}
