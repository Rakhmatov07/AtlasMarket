const IO = require('../utils/io');
const Contact = new IO('./database/contacts.json');
const validation = require('../validations/contact.validation');
const Model = require('../models/contact.model');
const Joi = require('joi');



const contactUs = async(req, res) => {
    try{
            // Read elements
        const contacts = await Contact.read();
        const { name, email, phone, message } = req.body;
            // Validate Input
        const error = validation({name, email, phone, message});
        if(error){
            return res.status(403).json({error});
        }
            // Check the contact exists or not
        const findContact = contacts.find((contact) => contact.message === message);
        if(!findContact){
            const newContact = new Model(name, email, phone, message);
            const data = contacts.length ? [...contacts, newContact] : [newContact];
            await Contact.write(data);
        }

        res.status(201).json({message: "Created"});
    }catch(error){
        res.status(500).json(error.message);
    }
}

const showMine = async(req, res) => {
    try {
            // Read elements
        const contacts = await Contact.read();
        const { email } = req.body;
            // Validate Input
        const emailSchema = Joi.string().email().required();
        const {error} = emailSchema.validate(email);
        if(error){
            return res.status(403).json({error});
        }
            // Check the contact exists or not
        const findContacts = contacts.filter((contact) => contact.email === email);
        findContacts.length ?  res.status(200).json({message: "Contacts", findContacts}) 
        : res.status(404).json({message: "Not Found"});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const showAll = async(req, res) => {
    try {
            // Read elements
        const contacts = await Contact.read();
        res.status(200).json({message: "Success", contacts});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = { 
    contactUs,
    showMine,
    showAll
}