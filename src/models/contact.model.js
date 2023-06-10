const { v4: uuid } = require('uuid');

class ContactForm{
    constructor(name, email, phone, message){
        this.id = uuid(),
        this.name = name,
        this.email = email,
        this.phone = phone,
        this.message = message,
        this.createdAt = new Date()
    }
}

module.exports = ContactForm;