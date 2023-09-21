class AdoptRepository{
    constructor(context) {
        this.context = context;
    }

    async createAdoptRequest(petId, userId){
        return new Promise((resolve, reject)=>{
            this.context.query(`INSERT INTO adopt SET ?`,{petId, userId},(error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results.insertId);
            });
        });
    }

    async removeAdoptRequest(adoptId ){
        return new Promise((resolve, reject)=>{
            this.context.query('DELETE FROM adopt WHERE adoptId  = ' + adoptId , (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(bookId);
            });
        });
    }

    async GetAllFiltered(petId){
        return new Promise((resolve, reject)=>{
            this.context.query(`select adopt.*, users.userName from adopt join users on adopt.userId=users.userId where petId=${petId} `, (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    async isAlreadyMakeAdoptRequest(petId, userId){
        return new Promise((resolve, reject)=>{
            this.context.query(`select * from adopt WHERE petId = ${petId} and userId = ${userId}`, (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results.length > 0);
            });
        });
    }

    async approvedAdoptRequest(adoptId){
        return new Promise((resolve, reject)=>{
            this.context.query('UPDATE adopt SET ? WHERE adoptId = ' + adoptId,{isApproved: 1}, (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

}

module.exports = { AdoptRepository }