const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controllers')
const orderController = require('../controllers/order_controller')
const authMiddleware = require('../middleware/auth')

router.get('/verify', userController.verifyEmail)

router.post('/forgetPassword', userController.forgetPasswordEmail)

router.get('/resetPassword', userController.resetPassword)
router.post('/resetPassword', userController.resetPassword)

router.post('/register', userController.signup)
router.post('/login', userController.signin)


router.post('/placeCustomizedOrder/:userId', orderController.customizedPlaceOrder)

router.post('/razorPay', orderController.createRazorpayOrder)


module.exports = router
