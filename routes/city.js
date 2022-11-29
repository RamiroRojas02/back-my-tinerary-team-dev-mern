let router=require('express').Router()
const validator = require('../middlewares/validator')
const schema= require('../config/schemas/cities')
const passport = require('../config/passport')

let {create,update,destroy,read, readDetails}=require('../controllers/city')
router.route('/')
.get(read)
.post(validator(schema),create)
//Poner passport

router.route('/:id')
.get(readDetails)
.put(passport.authenticate('jwt',{session:false}),update)
.delete(passport.authenticate('jwt',{session:false}),destroy)

module.exports = router;
