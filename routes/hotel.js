let router=require('express').Router()
let validator = require('../middlewares/validator')
let schema = require('../config/schemas/hotels')
let {create, update, destroy, read,one}=require('../controllers/hotels')
router.route('/')
    .get(read)
    .post(validator(schema),create)

router.route('/:id')
    .patch(update)
    .delete(destroy)
    .get(one)


module.exports = router;