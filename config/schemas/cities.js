const joi =require('joi')

const schema = joi.object({
    name: joi.string().required().min(4).max(50).messages({
        'string.empty': 'Please put a name',
        'string.min': 'Name is too short',
        'string.max': 'Name too long' 
      }),
    continent:joi.string().required().min(4).max(20).messages({
        'string.empty': 'Please put a name',
        'string.min': 'Continent is too short',
        'string.max': 'Continent too long' 
      }),
    photo:joi.string().uri().required().messages({
        'string.empty': 'Please put any url',
        'string.uri': 'Please must to be a real link'    
    }),
    population:joi.number().required().min(5000).messages({
        'number.base': 'Please put a number',
        'number.min': 'Population must to be 5000 min'
      }),
    userId:joi.string().required().hex().length(24).message({
        'string.empty':'Please put a userId',
        'string.length':'Please put a userId with 24 caracters'
    }),
})
module.exports = schema