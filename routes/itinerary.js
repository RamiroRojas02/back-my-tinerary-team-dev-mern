let router=require('express').Router()
let {create}=require('../controllers/itinerary')
router.post('/',create)
module.exports = router;
