let router=require('express').Router()
let {create,update,destroy,read}=require('../controllers/city')
router.get('/',read)
router.post('/',create)
router.put('/:id',update)
router.delete('/:id',destroy)
module.exports = router;
