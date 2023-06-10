const IO = require('../utils/io');
const Company = new IO('./database/companies.json');
const validation = require('../validations/company.validation');
const Model = require('../models/company.model');
const { v4: uuid } = require('uuid');


const addCompany = async(req, res) => {
    try{
            // Read elements
        const companies = await Company.read();
        const { name, info } = req.body;
        const { image } = req.files;
        const imageName = `${uuid()}.${image.mimetype.split("/")[image.name.split(".").length - 1]}`
        image.mv(process.cwd() + `/uploads/${imageName}`);
            // Validate Input
        const error = validation({name, info});
        if(error){
            return res.status(403).json({error});
        }
            // Check the Company exists or not
        const findCompany = companies.find((company) => company.name === name && Company.info === info);
            // If exist send response with 400 status code
        if(findCompany){
            return res.status(403).json({message: "Company already exists!"});
        }

        const newCompany = new Model(name, imageName, info);
        const data = companies.length ? [...companies, newCompany] : [newCompany];
        await Company.write(data);
        res.status(201).json({message: "Created"});
    }catch(error){
        res.status(401).json(error);
    }
}

const showAllCompanies = async(req, res) => {
    const companies = await Company.read();
    res.status(200).json({message: "Success", companies});
}

const showSingleCompany = async(req, res) => {
    try {
        const companies = await Company.read();
        const {id} = req.params;
        const findCompany = companies.find((company) => company.id === id);
        if(!findCompany){
            return res.status(404).json({message: "Not Found"});
        }

        res.status(200).json({message: "Success", findCompany});
    } catch (error) {
        res.status(401).json(error);
    }

}

const editCompany = async(req, res) => {
    try {
            // Read elements
        const {id} = req.params;
        const { name, info } = req.body;
        const { image } = req.files;  
        const imageName = `${uuid()}.${image.mimetype.split("/")[image.name.split(".").length - 1]}`;  
           // Edit Company
        const result = await Company.update(id, imageName, {name, info});
        console.log(result);
        if(result){
            return res.status(401).json({result});
        }

        res.status(200).json({message: "Edited"});
    } catch (error) {
        res.status(401).json(error);
    }
}

const deleteCompany = async(req, res) => {
    try {
        const companies = await Company.read();
        const {id} = req.params;
        const findCompanies = companies.filter((company) => company.id !== id);
        await Company.write(findCompanies);
    
        res.status(200).json({message: "Deleted"});
    } catch (error) {
        res.status(401).json(error);
    }

}

module.exports = {
    addCompany,
    showAllCompanies,
    showSingleCompany,
    editCompany,
    deleteCompany
}