class UserRepository{
    constructor(context) {
        this.context = context;
    }

    async createUser(user){
        const {userName, password, isAdmin, phone} = user;

        return new Promise((resolve, reject)=>{
            this.context.query(`INSERT INTO users SET ?`,{userName, password, isAdmin, phone},(error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results.insertId);
            });
        });
    }

    async loginUser(user){
        const {userName, password} = user;

        return new Promise((resolve, reject)=>{
            this.context.query(`select * from users WHERE userName = '${userName}' and password = '${password}' `, (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

}

module.exports = { UserRepository }