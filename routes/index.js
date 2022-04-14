const express = require('express')
const router = express.Router()
const Beer = require('../models/beer')

router.get('/', async (req, res) => {
    let beers
    try {
        beers = await Beer.find().sort({createdAt: 'desc'}).limit(10).exec()
    } catch (error) {
        books = []
        console.error(error)
    }
    res.render('index.ejs', {beers: beers})
})

module.exports = router