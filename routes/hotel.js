let router=require('express').Router()
let validator = require('../middlewares/validator')
let schema = require('../config/schemas/hotels')
let schemaEditHotel = require('../config/schemas/hotelEdit')
let passport = require('../config/passport')

let {create, update, destroy, read,one}=require('../controllers/hotels')
router.route('/')
    .get(read)
    .post(validator(schema),create)
//Poner passport
router.route('/:id')
    .patch(passport.authenticate('jwt',{session:false}),validator(schemaEditHotel),update)
    .delete(passport.authenticate('jwt',{session:false}),destroy)
    .get(one)


module.exports = router;