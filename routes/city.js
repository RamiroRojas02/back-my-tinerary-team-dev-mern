let router=require('express').Router()
let {create,update,destroy}=require('../controllers/city')
router.post('/',create)
router.put('/:id',update)
router.delete('/:id',destroy)
module.exports = router;
