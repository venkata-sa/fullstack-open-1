import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'

const NewBlog = (props) => {
	const [title, titleReset] = useField('text')
	const [author, authorReset] = useField('text')
	const [url, urlReset] = useField('text')

	const handleSubmit = async (event) => {
		event.preventDefault()
		await props.createBlog({
			title: title.value,
			author: author.value,
			url: url.value,
			user: props.user
		})
		titleReset()
		authorReset()
		urlReset()
	}

	return (
		<div>
			<h2>create new</h2>

			<form onSubmit={handleSubmit}>
				<div>
					title:
					<input {...title} />
				</div>
				<div>
					author:
					<input {...author} />
				</div>
				<div>
					url:
					<input {...url} />
				</div>
				<button type='submit'>create</button>
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

export default connect(
	mapStateToProps,
	{ createBlog }
)(NewBlog)