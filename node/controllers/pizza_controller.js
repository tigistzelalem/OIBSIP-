const Pizza = require('../models/pizza_model')
const cloudinary = require('../middleware/cloudinary')

const getPizza = async (req, res) => {
    try {
        const pizza = await Pizza.find();
        if (!pizza) {
            return res.status(404).json({ message: 'There is no product' })
        }
        res.json({ pizza })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


const getPizzaById = async (req, res) => {
    const id = req.params.pizzaId
    // console.log(id)
    try {
        const pizza = await Pizza.findById(id);
        if (!pizza) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.json({ pizza })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createPizza = async (req, res) => {
    const { name, price } = req.body;
    // const image = req.file ? req.file.filename : null;

    try {
        await cloudinary.uploader.upload(req.file.path, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "upload faild" });
            } else {
                image = result.secure_url;
            }
        });
        const pizza = new Pizza({
            name,
            price,
            image
        });

        await pizza.save();

        res.status(200).json({ message: 'pizza created successfully', pizza: pizza });
        console.log(pizza)

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updatePizza = async (req, res) => {
    const id = req.params.pizzaId
    const { name, price } = req.body
    try {
        const pizza = await Pizza.findByIdAndUpdate(
            id,
            {
                name, price
            },
            { new: true }

        )
        if (!pizza) {
            res.status(404).json({ message: 'product not found' })
        }
        res.json({ message: 'product updated' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deletePizza = async (req, res) => {
    const id = req.params.pizzaId;
    console.log('Pizza ID to delete:', id);

    try {
        const pizza = await Pizza.findByIdAndDelete(id);
        console.log('Deleted pizza:', pizza);

        if (!pizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.json({ message: 'Pizza deleted', pizza });
    } catch (error) {
        console.error('Error deleting pizza:', error);
        res.status(500).json({ message: 'Error deleting pizza' });
    }
}
module.exports = {
    getPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza,
}