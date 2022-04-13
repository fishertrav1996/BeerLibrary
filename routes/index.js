const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('i am here')
    res.render('index.ejs')
})

module.exports = router