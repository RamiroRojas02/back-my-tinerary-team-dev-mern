let router=require('express').Router()
let {create, update}=require('../controllers/hotels')
router.post('/',create)
router.patch('/:id',update)

module.exports = router;