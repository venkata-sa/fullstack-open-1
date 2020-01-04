import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
	BrowserRouter as Router,
	Link, Route, Redirect
} from 'react-router-dom'

import blogService from './services/blogs'

import { getCurrentUser, logout, loginUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Users from './components/Users'
// import User from './components/User'

const App = ( props ) => {

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			props.loginUser( user )
			props.initializeBlogs()
			blogService.setToken(user.token)
		}
	}, [])

	const paddingStyle = { padding: 5 }

	const handleLogout = (props) => {
		props.logout()
		blogService.destroyToken()
		window.localStorage.removeItem('loggedBlogAppUser')
	}

	const loggedUserView = () => (
		<div>
			<p>{props.user.name} logged in</p>
			<button onClick={ () => handleLogout(props) }>logout</button>

			<Users />
		</div>
	)

	const loggedBlogView = () => (
		<div>
			<p>{props.user.name} logged in</p>
			<button onClick={ () => handleLogout(props) }>logout</button>
			
			<Togglable buttonLabel='create new' ref={newBlogRef}>
				<NewBlog />
			</Togglable>

			<Blogs />
		</div>
	)

	const showUser = (id) => {
		if( props.user === null ) return null
		
		const u = props.blogs.find( b => b.user.id === id )
		if( u === undefined ) return null

		const blogsToShow = () => props.blogs.filter( b => b.user.id === id )

		return (
			<div>
				<p> {props.user.name} logged in </p>
				<h2> { u.user.name } </h2>
				<h3> added blogs </h3>
				<ul>
				{ blogsToShow().map( b =>
					<li key = {b.id} >
						{b.title}
					</li>
				) }
				</ul>
			</div>
		)
	}

	const newBlogRef = React.createRef()

	return (
		<div>
			<Router>
				<div>
					<div>
						<Link style = { paddingStyle } to = '/'> login </Link>
						<Link style = { paddingStyle } to = '/users'> users </Link>
						<Link style = { paddingStyle } to = '/blogs'> blogs </Link>
					</div>
					<div>
						<h2>blogs</h2>
						<Notification />
						<Route exact path = '/' render = 
							{ () => props.user === null ? <Login /> : <Redirect to = '/blogs' /> }
						/>
						<Route exact path = '/users' render = 
							{ () => props.user === null ? <Redirect to = '/' /> : loggedUserView() } 
						/>
						<Route exact path = '/blogs' render = 
							{ () => props.user === null ? <Redirect to = '/' /> : loggedBlogView() }
						/>
						<Route path = '/users/:id' render =
							{ ({match}) => showUser(match.params.id) }
						/>
						{/* { props.user === null ? <Login /> : loggedUserView() } */}
					</div>
				</div>
			</Router>
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
	loginUser,
	initializeBlogs
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)