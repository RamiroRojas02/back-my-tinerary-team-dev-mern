let router=require('express').Router()
let {create,signin,signinWithToken, getMyProfile,updateMyProfile }=require('../controllers/user')
const {accountExists}  = require('../middlewares/accountExistsSignIn')
const {accountHasBeenVerified} = require('../middlewares/accountHasBeenVerified')
const passport = require('../config/passport')
const mustSignIn = require('../middlewares/mustSignIn')

const validator = require('../middlewares/validator')
const schemaSignIn = require('../config/schemas/userSignIn')

router.post('/',create)

router.post('/signin',validator(schemaSignIn),accountExists,accountHasBeenVerified,signin)
router.post('/token',passport.authenticate('jwt',{session:false}),mustSignIn,signinWithToken)
router.get('/me/:id',getMyProfile)
router.patch('/me/:id',updateMyProfile)


module.exports = router;
