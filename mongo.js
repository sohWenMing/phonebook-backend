require("dotenv").config()
console.log("password: ", process.env.PASSWORD)
const url = `mongodb+srv://nindgabeet:${process.env.PASSWORD}@cluster0.hb7m3ac.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

if(!process.argv[2] || !process.argv[3]) {
    console.log("You need to enter name and number as arguments")
    process.exit(1);
}

const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect(url).then((res) => {
    console.log("Successfully connected to the db")

    const personSchema = new mongoose.Schema({
        name: String,
        number: String 
    })

    const Person = mongoose.model("Person", personSchema);
    const personToAdd = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })

    personToAdd.save().then((res) => {
        console.log(res);
        mongoose.connection.close()
    })
})

