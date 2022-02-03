import React, {useReducer, useState} from 'react'
import Note from './components/Note'
import Person from './components/Person'

const App = (props) => {

    const [notes, setNotes] = useState(props.notes)

    const [newNote, setNewNote] = useState(
        'a new note...'
    )

    const [showAll, setShowAll] = useState(true)

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
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
        { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
    ])
    
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
export default App1