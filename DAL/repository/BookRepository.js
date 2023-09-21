class BookRepository{
    constructor(context) {
        this.context = context;
    }

    async createBooking(eventId, userId){
        return new Promise((resolve, reject)=>{
            this.context.query(`INSERT INTO book SET ?`,{eventId, userId},(error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results.insertId);
            });
        });
    }

    async removeBooking(bookId){
        return new Promise((resolve, reject)=>{
            this.context.query('DELETE FROM book WHERE bookId = ' + bookId, (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(bookId);
            });
        });
    }

    async GetAllFiltered(eventId){
        return new Promise((resolve, reject)=>{
            this.context.query(`select book.*, users.userName from book join users on book.userId=users.userId where eventId=${eventId} `, (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    async isAlreadyBooked(eventId, userId){
        return new Promise((resolve, reject)=>{
            this.context.query(`select * from book WHERE eventId = ${eventId} and userId = ${userId}`, (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results.length > 0);
            });
        });
    }

}

module.exports = { BookRepository }