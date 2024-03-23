// ---------dependencies------------------
const {persons} = require('../data_cs/persons');
const personArray = persons.persons;

const helpers = require('../../helperFunctions/stringFunctions')
const trimToLowerCase = helpers.trimToLower

// ---------dependencies------------------

// ------------functions---------------------


function findPerson(name) {
    console.log("name passed into FindPerson: ", name);
    console.log("PersonArray: ", personArray);
    const foundIndex = personArray.findIndex((person) => person.name === name)
    return {
        foundIndex: foundIndex, 
        IsFound: foundIndex !== -1
    } 
}

function findPersonById(id) {
    
    const foundIndex = personArray.findIndex((person) => person.id === id)
    console.log("foundIndex: ", foundIndex)
    return {
        foundIndex: foundIndex, 
        isFound: foundIndex !== -1
    }

}





  
// ------------functions---------------------

module.exports = {
    trimToLowerCase,
    findPerson,
    findPersonById
}

