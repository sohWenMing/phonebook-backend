const persons = {
    "persons":[
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  }
  
  function getNewId() {
    const {persons: personArray} = persons;
    const ids = personArray.map((person) => {
    return person.id
    })
    console.log("IdArray: ", ids);
    const newId = Math.max(...ids) + 1
    return(newId);
  }
    
  function createOrUpdatePerson(personObject) {
    const index = persons.persons.indexOf((person) => {
      return (person.id === personObject.id)
    })
    if(index !== -1) {
      persons.persons[index] = personObject;
      return;
    }
    else {
      personObject = {
        ...personObject, 
        id: getNewId()
      }
    }
    persons.persons = [...persons.persons, personObject];
    console.log("persons after adding: ", persons.persons);
    console.log("Person object from createOrUpdatePerson: ", personObject)
    return(personObject);
   
  }

  module.exports = {
    persons, createOrUpdatePerson
  }