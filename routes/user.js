let router=require('express').Router()
let {verify, register,signin,signinWithToken}=require('../controllers/user')
const {accountExists}  = require('../middlewares/accountExistsSignIn')
const {accountHasBeenVerified} = require('../middlewares/accountHasBeenVerified')
const passport = require('../config/passport')
const mustSignIn = require('../middlewares/mustSignIn')
const validator = require('../middlewares/validator')
const schemaSignIn = require('../config/schemas/userSignIn')
const schema= require('../config/schemas/users')
const accountExistsSignUp = require('../middlewares/accountExistsSignUp')
//primero valido con joi, luego verifico si la cuenta existe y si todo va bien creo el usuario
router.post('/SignUp',validator(schema),accountExistsSignUp,register)
router.get('/verify/:code',verify)

router.post('/signin',validator(schemaSignIn),accountExists,accountHasBeenVerified,signin)
router.post('/token',passport.authenticate('jwt',{session:false}),mustSignIn,signinWithToken)

module.exports = router;
