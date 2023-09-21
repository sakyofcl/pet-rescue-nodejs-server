const mysql = require('mysql');
const { PetRepository } = require("./repository/PetRepository");
const { PetTypeRepository } = require("./repository/PetTypeRepository");
const { InformRepository } = require("./repository/InformRepository");
const { EventRepository } = require("./repository/EventRepository");
const { ContactRepository } = require("./repository/ContactRepository");
const { UserRepository } = require("./repository/UserRepository");
const { BookRepository } = require("./repository/BookRepository");
const { AdoptRepository } = require("./repository/AdoptRepository");

class Uow {
    constructor() {
        this.context = mysql.createConnection({host: 'localhost',user: 'root', password: '', database: "pooja-web"});
        this.context.connect(error=>{
            if (error){
                console.log('databse not connected.');
                throw error;
            }
            console.log('database connected.');
        });
        
        this.Pets = new PetRepository(this.context);
        this.PetType = new PetTypeRepository(this.context);
        this.Inform = new InformRepository(this.context);
        this.Event = new EventRepository(this.context);
        this.Contact = new ContactRepository(this.context);
        this.User = new UserRepository(this.context);
        this.Book = new BookRepository(this.context);
        this.Adopt = new AdoptRepository(this.context);
    }
}

module.exports = {
    Uow
}