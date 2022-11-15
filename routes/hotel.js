let router=require('express').Router()
let {create, update, destroy, read}=require('../controllers/hotels')
router.get('/',read)
router.post('/',create)
router.patch('/:id',update)
router.delete('/:id',destroy)


module.exports = router;