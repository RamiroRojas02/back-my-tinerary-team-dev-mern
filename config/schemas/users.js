const joi =require('joi')

const schema = joi.object({
    name: joi.string().required().min(4).max(50).messages({
        'string.empty': 'Please put your first name',
        'string.min': 'Your first name is too short',
        'string.max': 'Your first name too long' 
      }),
    lastName:joi.string().required().min(2).max(50).messages({
        'string.empty': 'Please put a name',
        'string.min': 'Your last name is too short',
        'string.max': 'Your last name too long'
      }),
    photo:joi.string().uri().required().messages({
        'string.empty': 'Please put any url',
        'string.uri': 'Please must to be a real link'    
    }),
    age:joi.number().required().min(18).max(100).messages({
        'number.base': 'Please put a number',
        'number.min': 'Your age must to be 18 min',
        'number.max': 'Your age must to be 100 max'
      }),
    email:joi.string().required().email({minDomainSegments:2}).min(10).max(50).messages({
        'string.empty': 'Please put your email',
        'string.min': 'Your first name is too short',
        'string.max': 'Your first name too long' 
      }),
    password:joi.string().required().min(4).max(8).base64({ paddingRequired: false }).messages({
        'string.empty': 'Please put your password',
        'string.min': 'Your password is too short',
        'string.base64':'You need to put alphanumeric caracters to validate',
        'string.max': 'Your password too long' 
      }),       //admin user
 /*    role: joi.string().required().min(4).max(5).messages({
        'string.empty': 'Please put your role',
        'string.min': 'Your role can be user or admin only',
        'string.max': 'Your role can be user or admin only' 
      }), */
})
module.exports = schema