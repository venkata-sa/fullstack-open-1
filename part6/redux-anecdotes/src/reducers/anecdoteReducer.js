const reducer = (state = [], action) => {
	switch( action.type ) {
		case 'NEW_ANECDOTE':
			return [...state, action.data]
		case 'INIT_STATE':
			return action.data
		case 'INCREMENT_VOTES':
			const id = action.data.id
			const anecdoteToChange = state.find( n => n.id === id )
			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1
			}
			return state.map( anec =>
				anec.id !== id ? anec : changedAnecdote
			)
		default:
			return state
	}
}

export const createAnecdote = (data) => {
	return {
		type: 'NEW_ANECDOTE',
		data
	}
}

export const incrementVotes = (id) => {
	return {
		type: 'INCREMENT_VOTES',
		data: { id }
	}
}

export const initialization = ( data ) => {
	return {
		type: 'INIT_STATE',
		data
	}
}

export default reducer