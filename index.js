var express = require('express');
var app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const { Uow } = require('./DAL/uow');

app.use(bodyParser.json({limit:'500mb'}));
app.use(cors({origin: 'http://localhost:3000'}));

const uow = new Uow();

//PETS API
app.post('/pet', async function (req, res) {
    const petId = await uow.Pets.createPet(req.body);
    res.send({petId});
});

app.put('/pet', async function (req, res) {
    //update api
    await uow.Pets.updatePet(req.body);
    res.send(req.body);
});


app.post('/pet/GetAllFiltered', async function (req, res) { 
    //read api
    const pets = await uow.Pets.GetAllFiltered(req.body);
    res.send({items: pets});
});

app.get('/pet/:petId', async function (req, res) { 
    //read api
    const pet = await uow.Pets.GetPet(req.params.petId);
    res.send({items: pet});
});

app.delete('/pet/:petId', async function (req, res) {
    //delete api
    const petId = await uow.Pets.removePet(req.params.petId);
    res.send({petId});
});

//INFORM API
app.delete('/inform/:informId', async function (req, res) {
    //delete api
    const informId  = await uow.Inform.removeInform(req.params.informId);
    res.send({informId});
});

app.get('/inform/GetAll', async function (req, res) { 
    //read api
    const informs = await uow.Inform.GetAll();
    res.send({items: informs});
});

app.post('/inform', async function (req, res) {
    const informId = await uow.Inform.createInform(req.body);
    res.send({informId});
});

//EVENTS API
app.post('/events', async function (req, res) {
    const eventId = await uow.Event.createEvent(req.body);
    res.send({eventId});
});

app.put('/events', async function (req, res) {
    //update api
    await uow.Event.updateEvent(req.body);
    res.send(req.body);
});

app.post('/events/GetAllFiltered', async function (req, res) { 
    //read api
    const events = await uow.Event.GetAllFiltered(req.body);
    res.send({items: events});
});

app.get('/events/:eventId', async function (req, res) { 
    //read api
    const events = await uow.Event.GetEvent(req.params.eventId);
    res.send({items: events});
});

app.delete('/events/:eventId', async function (req, res) {
    //delete api
    const eventId = await uow.Event.removeEvent(req.params.eventId);
    res.send({eventId});
});

//CONTACT API

app.post('/contact', async function (req, res) {
    const contactId = await uow.Contact.createContact(req.body);
    res.send({contactId});
});

app.get('/contact/GetAll', async function (req, res) { 
    //read api
    const contacts = await uow.Contact.GetAllFiltered(req.body);
    res.send({items: contacts});
});

app.delete('/contact/:contactId', async function (req, res) {
    //delete api
    const contactId = await uow.Contact.removeContact(req.params.contactId);
    res.send({contactId});
});


//USER API

app.post('/user', async function (req, res) {
    const userId = await uow.User.createUser(req.body);
    res.send({userId});
});

app.post('/user/login', async function (req, res) {
    const user = await uow.User.loginUser(req.body);
    res.send({items: user});
});

// BOOKING API

app.get('/book/GetAll/:eventId', async function (req, res) { 
    //read api
    const book = await uow.Book.GetAllFiltered(req.params.eventId);
    res.send({items: book});
});

app.post('/book/:eventId/:userId', async function (req, res) {
    const isAlreadyBooked = await uow.Book.isAlreadyBooked(req.params.eventId, req.params.userId);

    if(isAlreadyBooked){
        res.send({isAlreadyBooked});
    }
    else{
        const bookId = await uow.Book.createBooking(req.params.eventId, req.params.userId);
        res.send({bookId});
    }
});

app.delete('/book/:bookId', async function (req, res) {
    //delete api
    const bookId = await uow.Book.removeBooking(req.params.bookId);
    res.send({bookId});
});


// ADOPT API

app.get('/adopt/GetAll/:petId', async function (req, res) { 
    //read api
    const adopt = await uow.Adopt.GetAllFiltered(req.params.petId);
    res.send({items: adopt});
});

app.post('/adopt/:petId/:userId', async function (req, res) {
    const isAlreadyMakeAdoptRequest = await uow.Adopt.isAlreadyMakeAdoptRequest(req.params.petId, req.params.userId);

    if(isAlreadyMakeAdoptRequest){
        res.send({isAlreadyMakeAdoptRequest});
    }
    else{
        const adoptId  = await uow.Adopt.createAdoptRequest(req.params.petId, req.params.userId);
        res.send({adoptId});
    }
});

app.delete('/adopt/:adoptId', async function (req, res) {
    //delete api
    const adoptId = await uow.Adopt.removeAdoptRequest(req.params.adoptId);
    res.send({adoptId});
});

app.get('/adopt/approved/:adoptId', async function (req, res) {
    //read api
    const adoptId = await uow.Adopt.approvedAdoptRequest(req.params.adoptId);
    res.send({adoptId});
});

//PETS TYPE API
app.get('/pettype/GetAll', async function (req, res) { 
    //read api
    const types = await uow.PetType.GetAll();
    res.send({items: types});
});

app.listen(8000, 'localhost', function() {
    console.log('server running...');
});

