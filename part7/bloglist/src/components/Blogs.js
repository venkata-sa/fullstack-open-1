import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { initializeBlogs, updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import Blog from './Blog/Blog'

const Blogs = (props) => {
	useEffect( () => {
		props.initializeBlogs()
	},[] )

	const blogsToShow = () => props.blogs.sort( (a,b) => b.likes - a.likes )

	const likeBlog = async (blog) => {
		const likedBlog = { ...blog, likes: blog.likes + 1}
		console.log(likedBlog)
		await props.updateBlog( likedBlog )
		props.setNotification(`blog ${likedBlog.title} by ${likedBlog.author} liked!`, 'green', 3)
	}

	const removeBlog = async (blog) => {
		const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
		if (ok) {
			await props.deleteBlog(blog)
			props.setNotification(`blog ${blog.title} by ${blog.author} removed!`, 'error', 3)
		}
	}

	return (
		<div>
			{blogsToShow().map( blog => 
				<Blog
					key={blog.id}
					blog={blog}
					// creator={blog.user.username === props.user.username ? true : false}
				/>
			)}
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
	initializeBlogs,
	setNotification,
	updateBlog,
	deleteBlog
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Blogs)