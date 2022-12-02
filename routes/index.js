let router =require('express').Router()
let itinerary = require('./itinerary.js')
let city = require('./city.js')
let user = require('./user.js')
let hotel = require('./hotel')
let show = require('./show')

let comment = require('./comment')

let reaction = require('./reaction')


router.use('/reactions',reaction)
router.use('/itineraries',itinerary)
router.use('/cities',city)
router.use('/auth',user)
router.use('/hotels', hotel)
router.use('/shows',show)
router.use('/comment',comment)
module.exports = router
