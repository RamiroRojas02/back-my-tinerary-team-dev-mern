const joi =require('joi')

const schema = joi.object({
  comment: joi.string().min(3).messages({
    "string.min": "The comment is too short" 
  }) ,
  userId: joi.string().required().hex().length(24).messages(),
  showId: joi.string().required().hex().length(24).messages(),
  date: joi.date().required()

})

module.exports = schema

