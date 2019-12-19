import React from 'react'

import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

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

const clickHandler = ( store, anecdote ) => {
		store.dispatch( setNotification( `You voted for '${anecdote.content}'` ) )
		store.dispatch( incrementVotes( anecdote.id ) )
		setTimeout( () => {
			store.dispatch( clearNotification() )
		}, 4000 )
}

const Listing = ( props ) => {
	const store = props.store
	const { anecdotes, notification, filter } = store.getState()
	const anecdoteList = anecdotes.filter( anecdote => anecdote.content.includes( filter ) )

	return (
		<>
			<h2>Anecdotes</h2>
			{anecdoteList
				.sort( ( a, b ) => b.votes - a.votes )
				.map(anecdote =>
				<List 
					anecdote = { anecdote }
					key = { anecdote.id }
					handleClick = { () => clickHandler( store, anecdote ) }
				/>
			)}
		</>
	)
}

export default Listing