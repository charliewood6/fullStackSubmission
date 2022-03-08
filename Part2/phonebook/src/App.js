import react, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './persons'
import './index.css'

const Persons = ({ persons, setPersons }) => {

  const confirmDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      personService
      .del(person.id)
      setPersons(persons.filter(existing => existing.id !== person.id))
    }
  }
  return (
    <div>
      <ul>
        {persons.map(person => 
          <li key={person.id}>{person.name} {person.number}  <button onClick={() => confirmDelete(person)}>delete</button></li>
          )}
      </ul>
    </div>
  )
}

const Filter = (props) => {
  return(
    <div>
      Filter shown with <input value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <div>
      <form onSubmit={props.addPerson}>
        <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Success = ({ message }) => {
  if (message === null){
    return null
  }
  return (
    <div className='success'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null){
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {name: newName, number: newNumber}

    if (persons.some(person => person.name == newName)){
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const toUpdate = persons.find(person => person.name === newName)
        personService
        .update(toUpdate.id, personObj)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== toUpdate.id ? person : returnedPerson) )
          setSuccessMessage(`Phone number succesfuly updated`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`Information of ${personObj.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    } else if (persons.some(person => person.number == newNumber)){
      alert(newNumber + ' phone number is already added to the phonebook')
    } else {
      personService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`${personObj.name} succesfully added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(`Information of ${error.response.data} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={successMessage}/>
      <Error message={errorMessage}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} 
      newNumber={newNumber} 
      addPerson={addPerson} 
      handleNumberChange={handleNumberChange} 
      handleNameChange={handleNameChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons.filter(person =>person.name.toLowerCase().includes(newFilter.toLowerCase()))} setPersons={setPersons}/>
    </div>
  )
}

export default App
