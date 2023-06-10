const IO = require('../utils/io');
const jwt = require('../utils/jwt');
const User = new IO('./database/users.json');


const isAuth = async(req, res, next) => {
    try{
            // Read elements
        const users = await User.read();
        const token = req.cookies.token;
        if(!token) return res.status(401).json({message: "Invalid token"});   
            // get id and find user
        const { userId } = jwt.verify(token);
        const findUser = users.find((user) => user.id === userId);
        if(findUser) {
            req.userId = userId;
            next();
        }else{
            res.status(400).json({message: "Invalid Token"});
        }
    }catch(error){
        res.status(401).json(error.message);
    }
}

module.exports = {
    isAuth
};