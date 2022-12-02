let router=require('express').Router()
let passport = require('../config/passport')
const validator = require('../middlewares/validator')
let commentCreator = require('../middlewares/commentCreator')
const schema = require('../config/schemas/comments')

let {create, read,edit,destroy} = require('../controllers/comment')

router.get('/',read)
router.post('/',passport.authenticate('jwt',{session: false}),validator(schema),create)
router.put('/',passport.authenticate('jwt',{session: false}),commentCreator,edit)
router.delete('/',passport.authenticate('jwt',{session: false}),commentCreator,destroy)

module.exports = router