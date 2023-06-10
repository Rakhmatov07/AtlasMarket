const fs = require("fs").promises;

class IO {
    #dir;
    constructor(dir){
        this.#dir = dir;
    };

    async read(){ 
        const data = await fs.readFile(this.#dir, "utf-8");
        return data ? JSON.parse(data) : [];
    };

    async write(data){
        await fs.writeFile(this.#dir, JSON.stringify(data, null, 2), "utf-8");
    };

     async update(id, args){
        try{
            const datas = await this.read();
            const findItem = datas.find((data) => data.id === id);
            const keysOfData = Object.keys(args);
            const keysOfItem = Object.keys(findItem);
            const values = Object.values(args);
            for(let i = 0; i < keysOfData.length; i++){
                if(keysOfItem.includes(keysOfData[i]) && values[i]){
                    findItem[keysOfData[i]] = args[keysOfData[i]];
                }
            }

            this.write(datas);
            return false;
        }catch(error){
            return error.message;
        }
    }
};


module.exports = IO;