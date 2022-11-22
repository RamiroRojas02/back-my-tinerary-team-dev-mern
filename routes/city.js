let router=require('express').Router()
let {update,destroy}=require('../controllers/city')
router.put('/:id',update)
router.delete('/:id',destroy)
module.exports = router;
