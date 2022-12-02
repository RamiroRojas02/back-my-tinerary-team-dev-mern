let router=require('express').Router()
/* const passport = require('../config/passport') */
const validator = require('../middlewares/validator')
const reactionSchema = require('../config/schemas/reactionCreate')
const passport = require('../config/passport')

let {create,edit,readReactions}=require('../controllers/reaction')


router.post('/',validator(reactionSchema),create)
router.put('/',passport.authenticate('jwt',{session:false}),edit)
router.get('/',readReactions)

module.exports = router;