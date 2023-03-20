const cartItems_controller = require('../controller/cartItems_controller')

function post_product_to_cartItems(app){
    app.post('/cartItems', cartItems_controller.add_product_to_cartItems)
}

module.exports = {post_product_to_cartItems}