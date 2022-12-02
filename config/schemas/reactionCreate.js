const joi = require("joi");

const schema = joi.object({
    itineraryId :joi.any(),
    name: joi.string().required().min(4).max(50).messages({
        'string.empty': 'Please put a name',
        'string.min': 'Name is too short',
        'string.max': 'Name too long'
    }),
    icon: joi.string().uri().messages({
        'string.empty': 'Please put any url',
        'string.uri': 'Please must to be a real link'
    }),   
    iconBack: joi.string().uri().messages({
        'string.empty': 'Please put any url',
        'string.uri': 'Please must to be a real link'
    }),
    userId :joi.any(),
});

module.exports = schema