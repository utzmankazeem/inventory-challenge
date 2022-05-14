const mongoose  = require("mongoose");

const warehouseSchema = {

    item: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    details: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
}

const Warehouse = new mongoose.model("warehouse", warehouseSchema)

module.exports = Warehouse;