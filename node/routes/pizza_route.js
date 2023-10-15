const express = require('express')
const router = express.Router()
const multer = require('multer')
const authMiddleware = require('../middleware/auth')
const pizzaController = require('../controllers/pizza_controller')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profile/'); // Specify the directory where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid name conflicts
    }
});

const upload = multer({ storage });

router.get('/getPizza', authMiddleware.authentication, pizzaController.getPizza)

router.get('/getPizzaById/:pizzaId', authMiddleware.authentication, pizzaController.getPizzaById)

router.post('/createPizza', upload.single('image'), authMiddleware.authentication, pizzaController.createPizza)

router.patch('/updatePizza/:pizzaId', authMiddleware.authentication, authMiddleware.authorizeAdmin, pizzaController.updatePizza)

router.delete('/deletePizza/:pizzaId', authMiddleware.authentication, pizzaController.deletePizza)

module.exports = router