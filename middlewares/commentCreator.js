const { invalidUser } = require("../config/responses")
const Comment = require('../models/Comment')



async function commentCreator  (req,res,next){
    let params = req.params
    let comment = await Comment.find({_id:  params.id,userId:req.user.id })
    
    if (comment) {
        return next()
    }
    // console.log("no paso");
    return invalidUser(req,res)
}

module.exports = commentCreator