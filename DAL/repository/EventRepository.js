class EventRepository{
    constructor(context) {
        this.context = context;
    }

    async createEvent(event){
        const {eventName, eventDate} = event;

        return new Promise((resolve, reject)=>{
            this.context.query(`INSERT INTO events SET ?`,{eventName, eventDate},(error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results.insertId);
            });
        });
    }

    async updateEvent(event){
        const {eventName, eventDate, isApproved, eventId} = event;

        return new Promise((resolve, reject)=>{
            this.context.query('UPDATE events SET ? WHERE eventId = ' + eventId,{eventName, eventDate, isApproved},(error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    async removeEvent(eventId){
        return new Promise((resolve, reject)=>{
            this.context.query('DELETE FROM events WHERE eventId = ' + eventId, (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(eventId);
            });
        });
    }

    async GetAllFiltered(query){
        return new Promise((resolve, reject)=>{
            let filterQuery = [];
            if(query.isApproved !=null){
                filterQuery.push(`isApproved = ${query.isApproved ? 1 : 0}`);
            }

            this.context.query('select * from events ' + (filterQuery.length ? 'where '+ filterQuery.join(' and ') + ' order by eventDate ' : ' order by eventDate ') , (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    async GetEvent(eventId){
        return new Promise((resolve, reject)=>{
            this.context.query('select * from events WHERE eventId = ' + eventId , (error, results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results[0]);
            });
        });
    }

}

module.exports = { EventRepository }