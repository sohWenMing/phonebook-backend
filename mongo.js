if(process.argv.length < 3) {
    console.log("enter password as argument")
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];


const mongoose = require('mongoose');
const url = `mongodb+srv://nindgabeet:${password}@cluster0.hb7m3ac.mongodb.net/phonbook?retryWrites=true&w=majority`
mongoose.connect(url);

const personSchema = new mongoose.Schema(
    {
        name: String, 
        number: String
    }
)

const Person = mongoose.model('Person', personSchema);
const person = new Person(
    {
        name: name,
        number: number
    }
)

if(
    process.argv.length === 5 &&
    process.argv[3] !== "" &&
    process.argv[4] !== ""
)
{   
    person.save().then((res) => {
        console.log(`Person name: ${name} number: ${number} saved`);
        Person.find({}).then((res) => {
            res.forEach((person) => {
                console.log(person)
            })
            mongoose.connection.close();
        })
    })
   
}
else {
    Person.find({}).then((res) => {
        res.forEach((person) => {
            console.log(person)
        })
        mongoose.connection.close();
    })
}




