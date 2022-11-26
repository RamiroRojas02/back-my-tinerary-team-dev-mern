let router=require('express').Router()
let {create, update,read, destroy}=require('../controllers/itinerary')
router.post('/',create)
router.get('/',read)
router.put('/:id',update)
router.delete('/:id',destroy)
module.exports = router;
