const joi =require('joi')

const schema = joi.object({
    comment: joi.string().min(3).messages({
      "string.min": "The comment is too short" 
    }),
    


}
    
    )
  
  module.exports = schema