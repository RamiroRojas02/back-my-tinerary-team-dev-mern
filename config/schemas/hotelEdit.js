const Joi = require("joi");

const schema = Joi.object({

  name: Joi.string().min(4).max(50).messages({
    'string.empty': 'Please put a name',
    'string.min': 'Name is too short',
    'string.max': 'Name too long' 
  }),
  photo: Joi.array().items(Joi.string().uri()).messages({
    'string.empty': 'Please put any url',
    'string.uri': 'Please must to be a real link'

  }),
  capacity: Joi.number().min(50).messages({
    'number.base': 'Please put a number',
    'number.min': 'Capacity must to be 50 min'
  }),

  description: Joi.string().min(30).max(1000).messages({
    'string.empty': 'Please put a description',
    'string.min':'Description is too short',
    'string.max':'Description is too long',


  })
});

module.exports = schema