const { verifyResponse } = require("../config/responses")

function accountHasBeenVerified(req, res, next) {
    console.log("aca tambien");
    if (req.user.verified) {
        return next()
    }
    verifyResponse(req,res)
}

module.exports = { accountHasBeenVerified }