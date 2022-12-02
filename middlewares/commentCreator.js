const { invalidUser } = require("../config/responses")


function commentCreator (req,res,next){

    if (req.user.id == req.body.userId) {
        
        return next()
    }

    console.log("pasaa");
    return invalidUser(req,res)
}

module.exports = commentCreator