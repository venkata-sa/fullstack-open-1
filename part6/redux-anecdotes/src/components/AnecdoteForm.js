import React from 'react'

import { createAnecdote } from '../reducers/anecdoteReducer'

const AddAnecdote = (props) => {
	const store = props.store

	const addNew = ( event ) => {
		event.preventDefault()
		store.dispatch( createAnecdote( event.target.anecdote.value ) )
		// console.log('added')
		event.target.anecdote.value = ''
	}
	
	return (
		<>
			<h2>create new</h2>
			<form onSubmit = { addNew } >
				<div><input name = "anecdote" /></div>
				<button type="submit" >create</button>
			</form>
		</>
	)
}

export default AddAnecdote