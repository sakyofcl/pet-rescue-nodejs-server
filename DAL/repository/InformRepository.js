class InformRepository{
    constructor(context) {
        this.context = context;
    }

    async createInform(inform){
        const {message, address, image} = inform;

        return new Promise((resolve, reject)=>{
            this.context.query(`INSERT INTO inform SET ?`,{message, address, image},(error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results.insertId);
            });
        });
    }

    async removeInform(informId){
        return new Promise((resolve, reject)=>{
            this.context.query('DELETE FROM inform WHERE informId = ' + informId, (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(informId);
            });
        });
    }

    async GetAll(){
        return new Promise((resolve, reject)=>{
            this.context.query('select * from inform order by informId desc' , (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

}

module.exports = { InformRepository}