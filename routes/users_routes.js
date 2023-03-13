const users_controller = require('../controller/users_crud_controller')

function get_products_route(app){
    app.get('/products', users_controller.get_products)
}

function get_product_id_route(app){
    app.get('/product/:id', users_controller.get_product_id)
}

function post_product_route(app){
    app.post('/products', users_controller.post_product)
}

function delete_product_route(app){
    app.delete('/product/delete/:id', users_controller.delete_product_id)
}

function put_product_id(app){
    app.put('/product/update/:id', users_controller.put_product_id)
}

function patch_protuct_id(app){
    app.patch('/product/update/:id', users_controller.patch_protuct_id)
}


module.exports = {
    get_products_route,
    get_product_id_route,
    post_product_route,
    delete_product_route,
    put_product_id,
    patch_protuct_id
}
