const express = require('express');
const router = express.Router();
const {persons, createOrUpdatePerson} = require('../data/data_cs/persons')
const {findPerson, findPersonById} = require('../data/data_bl/data_bl')
console.log(findPerson);
const connectToDatabase = require('../models/persons.js')

console.log("connect to database", connectToDatabase);

// let personsArray = persons.persons;

router.get('/', (req, res) => {
    res.send("this is the main route");
})

let Person;
router.get('/persons', async(req, res) => {
    try {
        if(!Person) {
            Person = await connectToDatabase();
        }
        Person.find({})
            .then((response) => res.json(response))
    }
    catch(error) {
        throw error;
    } 
})

// router.post('/persons', (req, res) => {
//     console.log(req.body)
//     const payload = req.body;
    

//     if(!payload.name || !payload.number || payload.name.trim() === "" || payload.number.trim() === "" ) {
//         res.status(400).end("Bad Request")
//         console.log("Error in payload");
//         return;
//     }
//     const duplicateCheck = findPerson(payload.name) 
//     if(duplicateCheck.IsFound) {
//         res.status(400).send("Duplicate data was found.")
//         return
//     }
    
//     const newPerson = createOrUpdatePerson(payload);
//     personsArray.push(newPerson);
//     console.log("new person created:", newPerson)
//     res.status(200).send(JSON.stringify(newPerson));
// })

// router.put('/persons/:id', (req, res) => {
//     console.log("Id passed in: ", req.params.id);
//     console.log("request body: ", req.body);
//     const indexToUpdate = personsArray.findIndex(person => person.id === req.body.id)
//     if (indexToUpdate === -1) {
//         res.status(404).send("This user doesn't currently exist in the database")
//         return
//     }
//     personsArray[indexToUpdate] = req.body;
//     res.status(200).json(req.body);


// })

// router.delete('/persons/:id', (req, res) => {


//     console.log("delete ran")
//     console.log("param: ", req.params.id);
//     console.log("inputparam type", typeof(req.params.id))
//     const idToDelete = findPersonById(Number(req.params.id));
//     if(!idToDelete.isFound) {
//         res.status(400).send("User was previously deleted");
//         return;
//     }
//     console.log("persons: ", persons);
//     console.log("index to delete: ", idToDelete.foundIndex);
//     const idOut = personsArray[idToDelete.foundIndex].id;
//     const filteredArray = personsArray.filter((person) => person.id !== idOut);
//     persons.persons = filteredArray;
//     console.log("Persons after delete", persons.persons);
//     res.status(200).send(idOut.toString());
// })
    

router.get('*', (req, res) => {
    res.status(400).send("we ain't got nothing here")
})

module.exports = router;