let router=require('express').Router()
let {create} = require('../controllers/show')
router.post('/', create)
module.exports = router;
