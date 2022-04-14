const mongoose = require('mongoose')
const path = require('path')
const beerImageBasePath = 'uploads/beerImages'

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
        required: true
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
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

beerSchema.virtual('imagePath').get(function() {
    if(this.image != null){
        return path.join('/', beerImageBasePath, this.image)
    }
})

module.exports = mongoose.model('Beer', beerSchema)
module.exports.beerImageBasePath = beerImageBasePath