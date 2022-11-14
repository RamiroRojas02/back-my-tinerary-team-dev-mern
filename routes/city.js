let router=require('express').Router()
let {update}=require('../controllers/city')
router.put('/:id',update)
module.exports = router;
