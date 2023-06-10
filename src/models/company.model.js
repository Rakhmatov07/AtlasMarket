const { v4: uuid } = require('uuid');

class Company{
    constructor(name, image, info){
        this.id = uuid(),
        this.name = name,
        this.image = image,
        this.info = info,
        this.createdAt = new Date()
    }
}

module.exports = Company;