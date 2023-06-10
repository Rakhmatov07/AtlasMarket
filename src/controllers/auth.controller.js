const IO = require('../utils/io');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');
const User = new IO('./database/users.json');
const Validation = require('../validations/auth.validation');
const Model = require('../models/auth.model');
const validateUser = new Validation();


const register = async(req, res) => {
    try{
            // Read elements
        const users = await User.read();
        const { fullname, email, phoneNumber, username, password } = req.body;
            // Validate Input
        const error = validateUser.register({fullname, email, phoneNumber, username, password});
        if(error){
            return res.status(403).json({error});
        }
            // Check the user exists or not
        const findUser = users.find((user) => user.username === username);
            // If exist send response with 400 status code
        if(findUser){
            return res.status(403).json({message: "Username already exists. Choose another one!"});
        }
            // If not hash the password and write to the DB
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = (new Model(username, hashedPass)).register(fullname, email, phoneNumber);
        const data = users.length ? [...users, newUser] : [newUser];
        const token = jwt.sign({userId: newUser.id});

        await User.write(data);
        res.cookie("token", token, { maxAge: 1000 * 60 * 60});
        res.status(201).json({message: "Created"});
    }catch(error){
        res.status(500).json(error.message);
    }
}

const login = async(req, res) => {
    try {
            // Read users and inputs
        const users = await User.read();
        const { email, password } = req.body;
        console.log(email, password);
            // Validate input
        const error = validateUser.login({ email, password });
        if(error){
            return res.status(403).json({error});
        }
            // Check if there is user or not
        const findUser = users.find((user) => user.email === email);  
        if(!findUser){
            return res.status(404).json({message: "Email or password is wrong!"});
        }      
        const checkPass = await bcrypt.compare(password, findUser.password);
            // If user doesn't exist send "Not Found" message with 404 status code
        if(!checkPass){
            return res.status(404).json({message: "Email or password is wrong!"});
        }
            // Else response Success with 200 status code and send token
        const token = jwt.sign({userId: findUser.id});
        res.cookie("token", token);
        res.status(200).json({message: "Logged In", token});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const showUsers = async(req, res) => {
    try {
        const users = await User.read();
        res.status(200).json({message: "Success", users});
    } catch (error) {
        res.status(500).json(error);
    }
}

const logout = async(req, res) => {
    try {
        const users = await User.read();
        const userId = req.userId;
        console.log(userId);
        const findusers = users.filter((user) => user.id !== userId);
        await User.write(findusers);

        res.clearCookie("token");
        res.status(200).json({message: "Deleted"});
    } catch (error) {
        res.status(401).json(error);
    }

}




module.exports = {
    register,
    login,
    showUsers,
    logout,
}