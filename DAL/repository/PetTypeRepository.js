class PetTypeRepository{
    constructor(context) {
        this.context = context;
    }

    async GetAll(){
        return new Promise((resolve, reject)=>{
            this.context.query('select * from pettypes', (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

}

module.exports = { PetTypeRepository }