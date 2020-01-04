import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'

import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = (props) => {
	const [username] = useField('text')
	const [password] = useField('password')
	
	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username: username.value,
				password: password.value
			})

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
			blogService.setToken(user.token)
			props.loginUser(user)
			// props.setNotification(`${user.name} logged in`, 3)
		} catch (exception) {
			// notify('wrong username of password', 'error')
			props.setNotification('wrong username or password', 'error', 3)
		}
	}

	return (
		<div>
			<h2> Log in for application </h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input {...username}/>
				</div>
				<div>
					password
					<input {...password} />
				</div>
				<button type="submit"> login </button>
			</form>
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
	loginUser,
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)