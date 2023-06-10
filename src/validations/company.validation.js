const Joi = require('joi');

const validateCompany = (data) => {
    const Schema = Joi.object({
        name: Joi.string().min(3).required(), 
        info: Joi.string().max(200).required()
    })

    const { error } = Schema.validate(data);
    if(error){
        return error ? error.message : false;
    }
}

module.exports = validateCompany;