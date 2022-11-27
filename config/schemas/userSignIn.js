const joi =require('joi')

const schema = joi.object({
    email: joi.string().required().email({minDomainSegments:2}).messages({
        'any.required':'Email required',
        'string.empty':'Need a email',
        'string.email':'Must be a real Email'
    }),
    password: joi.string().required().messages({
        'any.required': 'Password required',
        'string.empty': 'Need a password'
    })
})

module.exports= schema