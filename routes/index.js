let router =require('express').Router()
let itinerary = require('./itinerary.js')
let city = require('./city.js')
let user = require('./user.js')
let hotel = require('./hotel')

router.use('/itineraries',itinerary)
router.use('/cities',city)
router.use('/users',user)
router.use('/hotels', hotel)
module.exports = router
