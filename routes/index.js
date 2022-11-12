let router =require('express').Router()
let user = require('./user.js')
router.use('/user',user)
module.exports = router
