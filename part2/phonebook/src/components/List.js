import React from 'react';
import personService from '../services/RESTful'

const List = ({person, delEntry}) => {

	const handleDelete = (person, delEntry) => {
		var result = window.confirm(`Are you sure you want to delete ${person.name}`)
		if(result) {
			// handle delete route
			personService
				.remove(person.id)
				.then( response => delEntry(person))
				.catch( error => delEntry(person, 1) )
		}
		else {
			console.log('Do nothing');
		}
	}

	return (
		<div>{person.name} : { person.number } <button onClick = {() => handleDelete(person, delEntry)}> Delete </button> </div>
	)
}

export default List;