let router=require('express').Router()
let {create, update, destroy, read,one}=require('../controllers/hotels')
router.get('/',read)
router.post('/',create)
router.patch('/:id',update)
router.delete('/:id',destroy)
router.get('/:id',one)


module.exports = router;