import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AddAnecdote = (props) => {

	const addNew = async ( event ) => {
		event.preventDefault()
		const content = event.target.content.value
		event.target.content.value = ''
		const newStory = await anecdoteService.postNew( content )
		props.createAnecdote( newStory )
	}
	
	return (
		<>
			<h2>create new</h2>
			<form onSubmit = { addNew } >
				<div><input name = "content" /></div>
				<button type="submit" >create</button>
			</form>
		</>
	)
}

export default connect(
	null,
	{ createAnecdote }
)(AddAnecdote)