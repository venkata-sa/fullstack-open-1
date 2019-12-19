import React from 'react'

import { incrementVotes } from '../reducers/anecdoteReducer'

const List = ({anecdote, handleClick}) => {
	return (
		<>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick = { handleClick } > vote </button>
			</div>
			<hr />
		</>
	)
}

const Listing = ( props ) => {
	const store = props.store
	const anecdotes = store.getState()

	return (
		<>
			<h2>Anecdotes</h2>
			{anecdotes
				.sort( ( a, b ) => b.votes - a.votes )
				.map(anecdote =>
				<List 
					anecdote = { anecdote }
					key = { anecdote.id }
					handleClick = { () => store.dispatch( incrementVotes( anecdote.id ) ) }
				/>
			)}
		</>
	)
}

export default Listing