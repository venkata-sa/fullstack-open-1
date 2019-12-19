import React from 'react'

import { setFilter } from '../reducers/filterReducer'

const Filter = ( props ) => {
	const store = props.store

	const handleChange = ( event ) => {
		store.dispatch( setFilter( event.target.value ) )
	}

	const style = {
		marginTop: 10,
		marginBottom: 10
	}

	return (
		<div style = { style } >
			filter <input onChange = { handleChange } />
		</div>
	)
}

export default Filter