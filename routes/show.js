let router=require('express').Router()
let {create, update, destroy, read, } = require('../controllers/show')
router.get('/',read)
router.post('/', create)
router.patch('/:id', update)
router.delete('/:id', destroy)


module.exports = router;
