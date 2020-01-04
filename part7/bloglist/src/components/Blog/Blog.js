import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog}) => {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div style={blogStyle}>
			<a href = { `/blogs/${blog.id}` } >
				{ blog.title } { blog.author }
			</a>
		</div>
)}


Blog.propTypes = {
	blog: PropTypes.object.isRequired,
}

export default Blog