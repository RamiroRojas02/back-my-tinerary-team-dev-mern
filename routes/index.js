let router =require('express').Router()
let city = require('./city.js')
let user = require('./user.js')
router.use('/cities',city)
router.use('/users',user)
module.exports = router
