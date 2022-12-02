let router=require('express').Router()
/* const passport = require('../config/passport') */
const validator = require('../middlewares/validator')
const isTheUser = require('../middlewares/sameUser')
const reactionSchema = require('../config/schemas/reactionCreate')
const passport = require('../config/passport')
const Reaction = require('../models/Reaction')
let {create,edit,readReactions, destroy,}=require('../controllers/reaction')


router.post('/',validator(reactionSchema),create)
router.put('/' ,passport.authenticate('jwt',{session:false}),edit)
router.get('/', readReactions)
router.put('/:id',passport.authenticate("jwt", { session: false }), isTheUser(Reaction), destroy)


module.exports = router;