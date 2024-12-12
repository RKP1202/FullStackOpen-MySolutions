import { use, useEffect } from 'react'
import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Person'
import AppNotifaction from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState(null)
  // const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });


  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  // console.log(typeof(persons[0].number));

  if(!persons)
  {
    return null;
  }

  const handleDelete = (id) => {
    console.log(id);
    if (window.confirm(`Do you really want to delete person with id ${id}`)) {
      // console.log(`Person to be delted has id ${id}`);
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setNotification({ message: 'Person deleted successfully', type: 'success' });
          setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        })
        .catch(error => {
          setNotification({ message: 'Failed to delete person. It might already be removed.', type: 'error' });
          setTimeout(() => setNotification({ message: '', type: '' }), 3000);
          console.error('Error in deleting the Persons entry:', error);
        });
    }

  }


  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the name already exists in the phonebook
    const isDuplicate = persons.some((person) => person.name === newName);

    if (isDuplicate) {
      if (window.confirm(`${newName} is already added to the phonebook. Would you like to update the number with the new one?`)) {
        const existingPerson = persons.find(person => person.name === newName);

        const updatedDetails = { ...existingPerson, number: newNumber };

        personService.updatePerson(existingPerson.id, updatedDetails)
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              person.id === existingPerson.id ? updatedPerson : person
            ));
            setNewName('');
            setNewNumber('');
            setNotification({ message: `Updated ${existingPerson.name}'s number`, type: 'success' });
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);
          })
          .catch(error => {
            setNotification({ message: `Error updating ${existingPerson.name}. It might have been removed.`, type: 'error' });
            setPersons(persons.filter(person => person.id !== existingPerson.id));
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personService.addPerson(newPerson)
        .then(responseData => {
          setPersons(persons.concat(responseData));
          setNewNumber('');
          setNewName('');
          setNotification(`Added ${newName}`)
          setNotification({ message: `Added ${newName}`, type: 'success' });
          setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        })
        .catch(error => {
          console.error('Error while adding a new person:', error);
          alert('Failed to add the new contact. Please try again.');
        });
      // personService.addPerson(newPerson)
      // .then(responseData => {
      //   setPersons(persons.concat(responseData));
      //   setNewName('');
      //   setNewNumber('');
      // })
      // .catch(error => {
      //   console.error('Error while adding a new person:', error);
      //   alert('Failed to add the new contact. Please try again.');
      // });
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
      <h1>Phonebook</h1>
      <AppNotifaction message={notification.message} type={notification.type} />
      <Filter searchValue={searchValue} handleChangeSearch={handleChangeSearch} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App