const express = require('express')
const adminController = require('../controllers/admin_controller')
const authMiddleware = require('../middleware/auth')
const orderController = require('../controllers/order_controller')
const router = express.Router()

router.get('/order/:orderId', authMiddleware.authentication, orderController.getOrder)
router.get('/orders', authMiddleware.authentication, orderController.getOrders)
router.delete('/deleteOrder/:orderId', authMiddleware.authentication, orderController.deleteOrder)
router.get('/getIngredients', authMiddleware.authentication, adminController.getIngredients)
router.get("/:id", authMiddleware.authentication, adminController.getIngredient)
router.post('/sendEmail/:orderId', authMiddleware.authentication, adminController.sendOrderNotificationEmail)
router.post('/createIngredient/:pizzaId', authMiddleware.authentication, adminController.addIngredientToPizzaBase)
router.patch('/:pizzaId/:ingredientId', authMiddleware.authentication, adminController.updateIngredient)
router.delete('/:pizzaId/:ingredientId', authMiddleware.authentication, adminController.deleteIngredient)

module.exports = router