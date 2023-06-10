const Joi = require('joi');

class ValidateAuth{
    register(data){
        const Schema = Joi.object({
            fullname: Joi.string().min(3).required(), 
            email: Joi.string().email().required(), 
            phoneNumber: Joi.string().trim().pattern(/^\+\d{12}$/)
            .message('Phone number must be a valid format starting with "+"').required(), 
            username: Joi.string().alphanum().required(), 
            password: Joi.string().min(8).required()
        })

        const { error } = Schema.validate(data);
        if(error){
            return error ? error.message : false;
        }
    }

    login(data){
        const Schema = Joi.object({ 
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })

        const { error } = Schema.validate(data);
        if(error){
            return error ? error.message : false;
        }
    }
}

module.exports = ValidateAuth;