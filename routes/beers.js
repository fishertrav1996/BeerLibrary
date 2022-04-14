const express = require('express')
const router = express.Router()
const Beer = require('../models/beer')

// Get All Beers
router.get('/', async (req, res) => {
    let filters = {}
    if(req.query.name !== null && req.query.name !== ''){
        filters.name = new RegExp(req.query.name, 'i')
    }
    try {
        const beers = await Beer.find(filters)
        res.render('beers/index.ejs', { beers: beers, filters: req.query })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
    
})

// New Beer
router.get('/new', (req, res) => {
    res.render('beers/new.ejs', { beer: new Beer() })
})

// Create Beer
router.post('/', async (req, res) => {
    const beer = new Beer({
        name: req.body.name,
        category: req.body.category
    })
    try {
        const newBeer = await beer.save()
        //res.redirect(`beers/${newBeer.id}`)
        console.log('created beer')
        res.redirect('beers/')
    } catch (error) {
        console.log('error creating beer')
        console.log(error)
        res.render('beers/new', {
            beer: beer,
            errorMessage: 'Error creating the beer'
        })
    }
})

module.exports = router