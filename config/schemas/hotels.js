const Joi = require("joi");

const schema = Joi.object({
  cityId:  Joi.string().hex().length(24).required(),
  name: Joi.string().required().min(4).max(50).messages({
    'string.empty': 'Please put a name',
    'string.min': 'Name is too short',
    'string.max': 'Name too long' 
  }),
  photo: Joi.array().required().items(Joi.string().uri()).messages({
    'string.empty': 'Please put any url',
    'string.uri': 'Please must to be a real link'

  }),
  capacity: Joi.number().required().min(50).messages({
    'number.base': 'Please put a number',
    'number.min': 'Capacity must to be 50 min'
  }),
  userId: Joi.string().required().hex().length(24).messages(),
  description: Joi.string().required().min(30).max(1000).messages({
    'string.empty': 'Please put a description',
    'string.min':'Description is too short',
    'string.max':'Description is too long',


  })
});

module.exports = schema