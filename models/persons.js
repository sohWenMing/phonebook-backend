const path = require('path')
require("dotenv").config({
    path: path.resolve(__dirname, '../.env')
})
console.log("env password: ", process.env.PASSWORD);
const mongoose = require('mongoose');

const url = `mongodb+srv://nindgabeet:${process.env.PASSWORD}@cluster0.hb7m3ac.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

async function connectToDatabase() {
    try {
        await mongoose.connect(url)
        mongoose.set('strictQuery', false);

        const personSchema = new mongoose.Schema({
            name: String,
            number: String
        })

        personSchema.set('toJSON', {
            transform: (document, returnedObject) => {
                returnedObject.id = returnedObject._id.toString();
                delete returnedObject._id;
                delete returnedObject.__v;
                return returnedObject;
            }
        })
        
        const Person = mongoose.model('Person', personSchema);

        async function getAllPersons() {
            try {
                const allPersons = await Person.find({})
                return allPersons
            }
            catch(error) {
                throw error
            }
        }

        async function findPersonByName(reqBody) {
            try {
                console.log("findPersonByName ran");
                
                const foundPerson = await Person.find({"name": reqBody.name})
                console.log(foundPerson);
                return({
                    "foundPerson": foundPerson, 
                    "isFound": foundPerson.length > 0
                })
            }catch(error) {
                throw error
            }
        }

       
        async function savePerson(reqBody) {
            try {
                const personToSave = new Person({
                    "name": reqBody.name, 
                    "number": reqBody.number
                })
                const savedPerson = await personToSave.save();
                return savedPerson;
            }catch(error) {
                throw error
            }
        }

        async function updatePerson(personObject) {
            try {
                
                const foundAndUpdatedPerson = await Person.findByIdAndUpdate(
                    personObject.id,
                    {$set: 
                        {
                            name: personObject.name,
                            number: personObject.number
                        }
                    }
                )
                if(!foundAndUpdatedPerson) {
                    throw error;
                    return
                }
                const updatedPerson = await Person.findById(personObject.id);
                console.log("found person: ", foundAndUpdatedPerson);
                console.log("updated person: ", updatedPerson);
                return(updatedPerson);
                

               
            }
            catch(error) {
                throw error
            }
        }

        async function deletePersonById(id) {
            console.log("id passed into deletePersonById: ", id);
            try {
                const deletedResponse = await Person.findByIdAndDelete(id);
                return deletedResponse
            }
            catch(error) {
                throw error
            }
        }
        console.log("Connected to MongoDB")
        return {Person, getAllPersons, findPersonByName, savePerson, updatePerson, deletePersonById}
        }

    
    catch(error) {
        console.error(error.message);
    }
}
module.exports = connectToDatabase;