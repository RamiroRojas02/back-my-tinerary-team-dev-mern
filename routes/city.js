let router=require('express').Router()
let {create,update,destroy,read, readDetails}=require('../controllers/city')
router.get('/',read)
router.get('/:id',readDetails)
router.post('/',create)
router.put('/:id',update)
router.delete('/:id',destroy)
module.exports = router;
