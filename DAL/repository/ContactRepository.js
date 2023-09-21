class ContactRepository{
    constructor(context) {
        this.context = context;
    }

    async createContact(contact){
        const {message, phone, name} = contact;

        return new Promise((resolve, reject)=>{
            this.context.query(`INSERT INTO contacts SET ?`,{message, phone, name},(error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results.insertId);
            });
        });
    }

    async removeContact(contactId){
        return new Promise((resolve, reject)=>{
            this.context.query('DELETE FROM contacts WHERE contactId = ' + contactId, (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(contactId);
            });
        });
    }

    async GetAllFiltered(){
        return new Promise((resolve, reject)=>{
            this.context.query('select * from contacts order by contactId desc', (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

}

module.exports = { ContactRepository }