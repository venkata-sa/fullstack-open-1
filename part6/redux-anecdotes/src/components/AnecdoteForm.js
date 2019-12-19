import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'

const AddAnecdote = (props) => {

	const addNew = ( event ) => {
		event.preventDefault()
		props.createAnecdote( event.target.anecdote.value )
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

export default connect(
	null,
	{ createAnecdote }
)(AddAnecdote)