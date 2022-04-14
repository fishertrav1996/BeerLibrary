const mongoose = require('mongoose')

const beerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Beer', beerSchema)