let router=require('express').Router()
let {verify, register,signin,signinWithToken,leave}=require('../controllers/user')
const {accountExists}  = require('../middlewares/accountExistsSignIn')
const {accountHasBeenVerified} = require('../middlewares/accountHasBeenVerified')
const passport = require('../config/passport')
const mustSignIn = require('../middlewares/mustSignIn')
const validator = require('../middlewares/validator')
const schemaSignIn = require('../config/schemas/userSignIn')
const schema= require('../config/schemas/users')
const {accountExists1} = require('../middlewares/accountExistsSignUp')
//primero valido con joi, luego verifico si la cuenta existe y si todo va bien creo el usuario
router.post('/SignUp',validator(schema),accountExists1,register)
router.get('/verify/:code',verify)

router.post('/signin',validator(schemaSignIn),accountExists,accountHasBeenVerified,signin)
router.post('/token',passport.authenticate('jwt',{session:false}),mustSignIn,signinWithToken)
router.put('/sign-out',passport.authenticate('jwt',{session:false}),leave)
module.exports = router;
