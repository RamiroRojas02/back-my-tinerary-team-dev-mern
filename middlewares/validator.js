const validator = (schema) => [
    (req,res,next) =>{

        const data = schema.validate(req.body, {abortEarly : false})
        
        if (data.error) {
            return res.status(200).json({
                success: false,
                messagge : data.error.details//.map(e => e.message)
            })
        }
        next()
    }
]

module.exports = validator