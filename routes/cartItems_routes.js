const cartItems_controller = require('../controller/cartItems_controller')

function get_products(app){
    app.get('/cartItems/get', cartItems_controller.get_products)
}

function post_product(app){
    app.post('/cartItems/post', cartItems_controller.add_product)
}

function delete_product(app){
    app.delete('/cartItems/delete', cartItems_controller.delete_product)
}


function patch_product(app){
    app.patch('/cartItems/patch/:id', cartItems_controller.patch_product)
}
module.exports = {
    get_products,
    post_product,
    delete_product,
    patch_product
}