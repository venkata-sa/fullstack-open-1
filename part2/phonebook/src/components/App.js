import React, {useState, useEffect} from 'react';

import personService from '../services/RESTful';
import Notification from './Notification';
import List from './List';
import InputElement from './InputElement';
import './App.css';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [errorMsg, setErrorMsg] = useState(null);
	const [status, setStatus] = useState(null);

	useEffect( ()=> {
		personService
			.getAll()
			.then( initialPersons => setPersons(initialPersons) )
			.catch( setPersons([]) )
	}, []);

	const rows = (persons) => persons.filter( person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 )
		.map( (person, i) => <List key = {i} person = {person} delEntry = {delEntry} /> )

	const handleNewFilter = (event) => {
		setFilter(event.target.value);
	}

	const handleNewName = (event) => {
		setNewName(event.target.value);
	}

	const handleNewNumber = (event) => {
		setNewNumber(event.target.value);
	}

	const delEntry = (person, extra = 0) => {
		if(extra === 1) {
			setErrorMsg(`${person.name} was already deleted`);
			setStatus('');
			setTimeout( () => {
				setStatus(null);
				setErrorMsg(null);
			}, 2000);
		}
		setPersons(persons.filter( p => p.id !== person.id ));
	}

	const submitForm = (event) => {
		let flag = true;
		let copyOfNames = [...persons].map( person => person.name );
		let index = copyOfNames.indexOf(newName);
		if( index !== -1 ) {
			var result = window.confirm(`${newName} is already added to the phonebook, entry update? 'Yes'/'No' `);
			if( result ) {
				let pos = persons.find( p => p.name === copyOfNames[index]);
				personService
					.update( pos.id, {...pos, number: newNumber} )
					.then( changedPerson => setPersons(persons.map( p => p.id !== pos.id ? p : changedPerson )));
			}
			flag = false;
		}

		if( flag && newName.length >= 1) {
			event.preventDefault();
			let newNameObj = {
				name: newName,
				number: newNumber,
				id: persons.length + 1
			}
			personService
				.create(newNameObj)
				.then( returnedPerson => {
					setErrorMsg(`Added ${newNameObj.name}`);
					setStatus('success');
					setTimeout( () => {
						setErrorMsg(null);
						setStatus(null);
					}, 2000);
					setNewName('');
					setNewNumber('');
					setPersons(persons.concat(returnedPerson))
					return null;
                })
                .catch( error => {
                    console.log(error.response.data);
                })
		}
		else {
			setNewName('');
			setNewNumber('');
			setPersons(persons);
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			
			<Notification  message = {errorMsg} status = {status} />

			<form onSubmit = {submitForm}>
				<div>
					<InputElement 
						text = {'Filter'} 
						value = {filter} 
						onChange = {handleNewFilter} />

					<h3>Add new</h3>
					<InputElement 
						text = {'Name'} 
						value = {newName} 
						onChange = {handleNewName} />
					<InputElement 
						text = {'Number'} 
						value = {newNumber} 
						onChange = {handleNewNumber} />

				</div>
				<div>
					<button type = "submit">
						Add
					</button>
				</div>
			</form>

			<h3>Numbers</h3>
			<div>
				{rows(persons)}
			</div>
		</div>
	);
}

export default App;
