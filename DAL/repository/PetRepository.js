class PetRepository{
    constructor(context) {
        this.context = context;
    }

    async createPet(pet){
        const {petName, description, petType, petImage} = pet;

        return new Promise((resolve, reject)=>{
            this.context.query(`INSERT INTO pets SET ?`,{petName, petType, description, petImage},(error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results.insertId);
            });
        });
    }

    async updatePet(pet){
        const {petName, description, petType, petId, petImage} = pet;

        return new Promise((resolve, reject)=>{
            this.context.query('UPDATE pets SET ? WHERE petId = ' + petId,{petName, petType, description, petImage},(error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    async removePet(petId){
        return new Promise((resolve, reject)=>{
            this.context.query('DELETE FROM pets WHERE petId = ' + petId, (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(petId);
            });
        });
    }

    async GetAllFiltered(query){
        return new Promise((resolve, reject)=>{
            let filterQuery = [];
            if(query.searchText){
                filterQuery.push(`petName like '%${query.searchText}%'`);
            }
            if(query.petType){
                filterQuery.push(`petType = ${query.petType}`);
            }

            this.context.query('select *, pettypes.typeName from pets inner join pettypes on pets.petType = pettypes.typeId ' + (filterQuery.length ? 'where '+ filterQuery.join(' and ') + ' order by create_at desc ' : ' order by create_at desc ') , (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    async GetPet(petId){
        return new Promise((resolve, reject)=>{
            this.context.query('select * from pets WHERE petId = ' + petId , (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results[0]);
            });
        });
    }

}

module.exports = { PetRepository}