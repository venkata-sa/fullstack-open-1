import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import blogService from './services/blogs'

import { getCurrentUser, logout, loginUser } from './reducers/userReducer'

import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Login from './components/Login'
import Blogs from './components/Blogs'

const App = ( props ) => {

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			props.loginUser( user )
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogout = (props) => {
		props.logout()
		blogService.destroyToken()
		window.localStorage.removeItem('loggedBlogAppUser')
	}

	if (props.user === null) {
		return (
			<div>
				<h2>log in to application</h2>

				<Notification />

				<Login />
			</div>
		)
	}

	const newBlogRef = React.createRef()

	return (
		<div>
			<h2>blogs</h2>

			<Notification />

			<p>{props.user.name} logged in</p>
			<button onClick={ () => handleLogout(props) }>logout</button>

			<Togglable buttonLabel='create new' ref={newBlogRef}>
				<NewBlog />
			</Togglable>

			<Blogs />
		</div>
	)
}

const mapStateToProps = ( state ) => {
	return {
		blogs: state.blogs,
		user: state.user,
		notification: state.notification
	}
}

const mapDispatchToProps = {
	getCurrentUser,
	logout,
	loginUser
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)