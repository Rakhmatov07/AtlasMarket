const {v4: uuid} = require("uuid");

class Authentification{
    constructor(username, password){
        this.id = uuid(),
        this.username = username,
        this.password = password,
        this.role = "user",
        this.createdAt = new Date()
    }

    register(fullname, email, phoneNumber){
        return {id: this.id, fullname, email, phoneNumber, username: this.username, password : this.password, role: this.role, createdAt: this.createdAt};
    }

    login(){
        return {username: this.username, password: this.username};
    }
}

module.exports = Authentification;