let router=require('express').Router()
const passport = require('../config/passport')

let {create, update, destroy, read, } = require('../controllers/show')
router.get('/',read)
router.post('/', create)
router.patch('/:id',passport.authenticate('jwt',{session:false}), update)
router.delete('/:id',passport.authenticate('jwt',{session:false}), destroy)


module.exports = router;
//Poner passport
