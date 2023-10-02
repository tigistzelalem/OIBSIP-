const express = require('express')
const adminController = require('../controllers/admin_controller')
const authMiddleware = require('../middleware/auth')
const orderController = require('../controllers/order_controller')
const router = express.Router()

// router.get('/order', authMiddleware.authentication, orderController.getOrder)
// router.get('/orders', authMiddleware.authentication, orderController.getOrders)
router.get('/getIngredients', adminController.getIngredients)
router.get("/:id", adminController.getIngredient)
router.post('/sendEmail/:orderId', adminController.sendOrderNotificationEmail)
router.post('/createIngredient/:pizzaId', adminController.addIngredientToPizzaBase)
router.patch('/:pizzaId/:ingredientId', adminController.updateIngredient)
router.delete('/:pizzaId/:ingredientId', adminController.deleteIngredient)

module.exports = router