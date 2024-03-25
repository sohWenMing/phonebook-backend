const path = require('path')
require("dotenv").config({
    path: path.resolve(__dirname, '../.env')
})
const mongoose = require('mongoose');

const url = `mongodb+srv://nindgabeet:${process.env.PASSWORD}@cluster0.hb7m3ac.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

async function connectToDatabase() {
    try {
        await mongoose.connect(url)
        mongoose.set('strictQuery', false);
        console.log("Connected to MongoDB")

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
        return Person
        }
    
    catch(error) {
        console.error(error.message);
    }
}
module.exports = connectToDatabase;