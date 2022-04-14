const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const imageTypes = ['images/jpeg', 'images/png', 'images/gif']
const router = express.Router()
const Beer = require('../models/beer')
const uploadPath = path.join('public', Beer.beerImageBasePath)
const upload = multer({
    dest: uploadPath,
    //maybe try and add filters on the image types again wouldn't work
})

// Get Beers (all be default)
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
router.get('/new', async (req, res) => {
    try {
        res.render('beers/new.ejs', { beer: new Beer() })
    } catch (error) {
        res.redirect('/beers')
    }
})

// Create Beer
router.post('/', upload.single('image'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const beer = new Beer({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        rating: req.body.rating,
        brand: req.body.brand,
        country: req.body.country,
        image: fileName,
        description: req.body.description
    })
    try {
        const newBeer = await beer.save()
        //res.redirect(`beers/${newBeer.id}`)
        console.log('created beer')
        res.redirect('beers/')
    } catch (error) {
        console.log('error creating beer')
        console.log(error)
        if(beer.image !== null){
            removeImage(beer.image)
        }
        res.render('beers/new', {
            beer: beer,
            errorMessage: 'Error creating the beer'
        })
    }
})

function removeImage(fileName){
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.error(err)
    })
}

module.exports = router