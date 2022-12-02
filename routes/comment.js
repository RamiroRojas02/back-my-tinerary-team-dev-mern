let router=require('express').Router()
let passport = require('../config/passport')
const validator = require('../middlewares/validator')

const schema = require('../config/schemas/comments')

let {create, read} = require('../controllers/comment')

router.get('/',read)
router.post('/',passport.authenticate('jwt',{session: false}),validator(schema),create)

module.exports = router