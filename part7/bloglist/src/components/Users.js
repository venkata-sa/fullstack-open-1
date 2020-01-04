import React, { useEffect, useState } from 'react'

import userService from '../services/users'

const Users = () => {
	const [ users, setUser ] = useState([])

	useEffect( () => {
		userService.getAll()
			.then( user => setUser(user) )
	}, [])

	return (
		<div>
			<h2> Users </h2>
			<table>
				<thead>
					<tr>
						<th> </th>
						<th> blogs created </th>
					</tr>
				</thead>
				<tbody>
					{ users.map( user =>
						<tr key = { user.id } >
							<td>
								<a href = { `/users/${user.id}` } > { user.name } </a>
							</td>
							<td> { user.blogs.length } </td>
						</tr>
					) }
				</tbody>
			</table>
		</div>
	)
}

export default Users