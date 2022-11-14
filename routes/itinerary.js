let router=require('express').Router()
let {create, update}=require('../controllers/itinerary')
router.post('/',create)
router.put('/:id',update)
module.exports = router;
