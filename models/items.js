const mongoose = require('mongoose');

const itemSchema = {
   name: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    date_registered: {
        type: Date,
        default: Date.now
    },
}

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;