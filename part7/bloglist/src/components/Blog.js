import React from 'react'

const Blog = ({ blog, likeBlog }) => {
	return (
		<div>
			<h2> { blog.title } { blog.author } </h2>
			<a href = { blog.url } > { blog.url } </a>
			<div>
				{ blog.likes } likes
				<button onClick = { () => likeBlog(blog) } > like </button>
			</div>
			<div> added by { blog.user.name } </div>
			{ blog.comments === undefined ? null 
			: <div>
				<ul>
					{ blog.comments.map( b =>
						<li key = { b.id } > { b } </li>
					) }
				</ul>
			</div> }
		</div>
	)
}

export default Blog