let router=require('express').Router()
let {verify, register}=require('../controllers/user')
const validator = require('../middlewares/validator')
const schema= require('../config/schemas/users')
const accountExistsSignUp = require('../middlewares/accountExistsSignUp')
//primero valido con joi, luego verifico si la cuenta existe y si todo va bien creo el usuario

router.post('/SignUp',validator(schema),accountExistsSignUp,register)
router.get('/verify/:code',verify)
module.exports = router;
