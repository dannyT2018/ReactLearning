import React, {useReducer, useState, useEffect} from 'react'
import Note from './components/Note'
import Person from './components/Person'
import Country from './components/Country'

import axios from 'axios'
import { render } from 'react-dom'

const App = () => {

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log('promise fulfilled')
                setNotes(response.data)
            })
    }
    useEffect(hook,[])
    console.log('render', notes.length, 'notes')

    const addNote = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)

        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }
        setNotes(notes.concat(noteObject))
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note => 
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type='submit'>save</button>
            </form>
        </div>
    )
}
// export default App
//////////////////////////////////////////////////////////////////////////////////////
const Filter = (props) => {

    const filter = (event) => {
        event.preventDefault()
        props.setFilterItem(event.target.value)
    }
    return (
        <div>
            filter shown with <input value={props.filterItem} onChange={filter}></input>
        </div>
    )
}

const PersonForm = (props) => {
    const [newName, setNewName] = useState('add new person...')
    const [newPhoneNumber, setNewPhoneNumber] = useState('add new phone number...')
    
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setNewPhoneNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if  (props.persons.some(e => e.name === newName)) {
            window.alert(`${newName} is already added to phonebook`);
            
        } else {
            const personObject = {
                name: newName,
                phoneNumber: newPhoneNumber,
                date: new Date().toISOString(),
            }
            props.setPersons(props.persons.concat(personObject))
            setNewName('')
            setNewPhoneNumber('')
        }
    }

    return(
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            <div>
                number: <input value={newPhoneNumber} onChange={handlePhoneChange}/>
            </div>
            </div>
            <div>
                <button type="submit">add</button>
                <button onClick={() => props.setPersons([])}>clear</button>
            </div>
        </form>
    )
}

const Persons = (props) => {
    const people = props.persons.filter(person => person.name.toLowerCase().includes(props.filterItem.toLowerCase()))

    return (
        <div>
            {people.map(person => 
                <Person key={person.name} person={person} />
            )}
        </div>
    )
}
const App1 = () => {
    const [persons, setPersons] = useState([])

    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }
    useEffect(hook, [])
    const [filterItem, setFilterItem] = useState('')

    return (
      <div>
        <h2>Phonebook</h2>
        <Filter filterItem={filterItem} setFilterItem={setFilterItem}/>
        <h2>Add a New Person</h2>
        <PersonForm persons={persons} setPersons={setPersons}/>
        <h2>Numbers</h2>
        <Persons persons={persons} filterItem={filterItem}/>
      </div>
    )
  }
// export default App1
////////////////////////////////////////////////////////////////
//npx json-server --port 3001 --watch db.json
const CountrySearch = (props) => {
    const handleCountryChange = (event) => {
        props.setNewCountry(event.target.value)
    }
    return (
        <div>
            find countries <input value={props.newCountry} onChange={handleCountryChange}/>
        </div>
    )
}

const Languages = (props) => {
    const languages = props.languages
    return (
        <div>
            {Object.entries(languages).map(([abbv, language]) =>
                <li>{language}</li>
            )}
        </div>
    )
}
const DisplayCountryInfo = (props) => {
    const country = props.country
    const countryName = country["name"]["common"]
    const capital = country["capital"]
    const population = country["population"]
    const languages = country["languages"]
    const flagURL = country["flags"]["svg"]

    return (
        <div>
            <h2>{countryName}</h2>
            capital: {capital}
            <br/>
            population: {population}
            <h3>Languages</h3>
            <Languages languages={languages}/>
            <img src={flagURL}/>
        </div>
    )
}
const Countries = (props) => {
    const filteredCountires = props.countries.filter(country => country["name"]["common"].toLowerCase().includes(props.newCountry.toLowerCase()))
    if (filteredCountires.length === 1) {
        return (
            <div>
                <DisplayCountryInfo country={filteredCountires[0]}/>
            </div>
        )
    } else if (filteredCountires.length <= 10) {
        return (
            <div>
                {filteredCountires.map(country => 
                    <Country key={country.name} country={country} />
                )}
            </div>
        )
    } else {
        return (
            <div>
                {"Too many to display"}
            </div>
        )
    }
}


const App2 = () => {
    const [countries, setCountries] = useState([])
    const [newCountry, setNewCountry] = useState('')

    const hook = () => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
                // console.log(response.data[0]['name']['common'])
            })
    }
    useEffect(hook,[])
    return (
        <div>
            <CountrySearch newCountry={newCountry} setNewCountry={setNewCountry}/>
            <Countries countries={countries} newCountry={newCountry}/>
        </div>
    )
}

export default App2
