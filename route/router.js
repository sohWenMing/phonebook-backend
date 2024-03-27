const express = require('express');
const router = express.Router();
const {persons, createOrUpdatePerson} = require('../data/data_cs/persons')
const {findPerson, findPersonById} = require('../data/data_bl/data_bl')
console.log(findPerson);
const connectToDatabase = require('../models/persons.js')

console.log("connect to database", connectToDatabase);

function validateBody(req, res) {
    if(!req.body.name || !req.body.number || req.body.name === "" || req.body.number === "") {
        res.status(409).send("mandatory information was not filled")
        return
    }
}

async function findExistingPerson(Person, body) {
    try {
        const existingPerson = await Person.findPersonByName(body);
        console.log("Existing person in findExistingPerson: ", existingPerson);
        return existingPerson;
    }
    catch(error) {
        throw error
    }
}

// let personsArray = persons.persons;
let Person;

router.use('*', async(req, res, next) => {
    try {
        if(!Person) {
            Person = await connectToDatabase();
            console.log("base route ran")
        }
        next()
    }
    catch(error) {
        throw error
    }

})

router.get('/', (req, res) => {
    res.send("this is the main route");
})


router.get('/persons', async(req, res) => {
    try {
        Person.getAllPersons()
            .then((response) => res.json(response))
    }
    catch(error) {
        throw error;
    } 
})

router.post('/persons', async(req, res) => {
    validateBody(req, res);
    try {
        const existingPerson = await findExistingPerson(Person, req.body);
        console.log("Is found value: ", existingPerson.isFound);
        if(existingPerson.isFound) {
            res.status(409).send("person already exists in the database")
        return
        }
        else{
            const savedPerson = await Person.savePerson(req.body);
            const allPersons = await Person.getAllPersons();
            res.status(200).json({
                savedPerson, allPersons
            })
        }
    }
    catch(error) {
        res.status(400).send(error.message);
    } 
})

router.put('/persons/:id', async(req, res) => {
   try {
    const updatedPerson = await Person.updatePerson(req.body);
    const allPersons = await Person.getAllPersons();
    res.status(200).json({
        updatedPerson, allPersons
    })
   }
   catch(error) {
    res.status(400).send(error.message)
    
   }
   
})

router.post('/test', async(req, res) => {
    try {
        const foundPerson = await Person.find({"name": req.body.name})
        if(foundPerson.length != 0) {
            res.status(409).send("This person's name already exists in the database")
            return
        }
        else {
            const personToAdd = new Person({
                "name": req.body.name, 
                "number": req.body.number
            })
            const addedPerson = await personToAdd.save();
            console.log(addedPerson);
            
            
        }
    }
    catch(error) {
        res.send(error);
    }
    

})

router.delete('/persons/:id', async(req, res) => {
    console.log("id passed in: ", req.params.id);
    try {
        const deletedPerson = await Person.deletePersonById(req.params.id);
        const allPersons = await Person.getAllPersons();
        res.status(200).json({
            deletedPerson, allPersons 
        })
    }
    catch(error) {
        res.status(400).send(error.message);
    }
})
    

    

router.get('*', (req, res) => {
    res.status(400).send("we ain't got nothing here")
})

module.exports = router;