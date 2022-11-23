let router=require('express').Router()
const validator = require('../middlewares/validator')
const schema= require('../config/schemas/cities')
let {create,update,destroy,read, readDetails}=require('../controllers/city')
router.route('/')
.get(read)
.post(validator(schema),create)

router.route('/:id')
.get(readDetails)
.put(update)
.delete(destroy)

module.exports = router;
