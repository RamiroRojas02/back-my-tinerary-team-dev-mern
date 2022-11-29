let router=require('express').Router()
const passport = require('../config/passport')

let {create, update,read, destroy}=require('../controllers/itinerary')
router.post('/',create)
router.get('/',read)
router.put('/:id',passport.authenticate('jwt',{session:false}),update)
router.delete('/:id',passport.authenticate('jwt',{session:false}),destroy)
module.exports = router;
//Poner passport
