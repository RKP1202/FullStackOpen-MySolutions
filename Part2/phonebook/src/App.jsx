import { use, useEffect } from 'react'
import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      },)
  } , [])
  // console.log(typeof(persons[0].number));

  const handleSubmit = (event) => {
    event.preventDefault();

    // Checking for duplicates
    const isDuplicate = persons.some((person) => person.name === newName);

    if (isDuplicate) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newPerson =
      {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');

    }
  };


  const handleChangeName = (event) => {
    console.log(event.target)
    setNewName(event.target.value)

  }

  const handleChangeNumber = (event) => {
    console.log(event.target)
    setNewNumber(event.target.value)

  }

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value)
    // console.log(searchValue);

  }

  // Getting the filtered persons
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))
  // console.log(filteredPersons);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchValue={searchValue} handleChangeSearch={handleChangeSearch} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App