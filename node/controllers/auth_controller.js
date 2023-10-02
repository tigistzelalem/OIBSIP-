const Inventory = require('../models/inventory_model')

const AdminDashboard = async (req, res) => {
    try {
        const inventory = Inventory.find()

        if (!inventory) {
            res.status(404).json('could not found inventory')
        }
    res.json({inventory: inventory})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}