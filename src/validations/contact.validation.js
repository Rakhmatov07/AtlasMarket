const Joi = require('joi');

const validateContact = (data) => {
    const Schema = Joi.object({
        name: Joi.string().min(3).required(), 
        email: Joi.string().email().required(), 
        phone: Joi.string().trim().pattern(/^\+\d{12}$/)
        .message('Phone number must be a valid format starting with "+"').required(), 
        message: Joi.string().max(200).required()
    })

    const { error } = Schema.validate(data);
    if(error){
        return error ? error.message : false;
    }
}

module.exports = validateContact;