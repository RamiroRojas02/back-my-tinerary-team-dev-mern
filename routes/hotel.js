let router=require('express').Router()
let {create, update, destroy}=require('../controllers/hotels')
router.post('/',create)
router.patch('/:id',update)
router.delete('/:id',destroy)


module.exports = router;