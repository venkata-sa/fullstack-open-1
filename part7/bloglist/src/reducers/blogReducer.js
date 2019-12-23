import blogService from '../services/blogs'

const reducer = ( state = [], action ) => {
	switch ( action.type ) {
		case 'NEW_BLOG':
			return [ ...state, action.data ]
		case 'INIT_BLOG':
			return action.data
		case 'UPDATE':
			const id = action.data.id
			console.log( id )
			return state.map( blog =>
				blog.id !== id ? blog : action.data
			)
		case 'DELETE':
			return state.filter( blog =>
					blog.id !== action.data.id
				)
		default:
			return state
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT_BLOG',
			data: blogs
		})
	}
}

export const createBlog = ({title, author, url, user}) => {
	const blogObj = {
		title,
		author,
		url,
		likes: 0,
		user
	}
	return async dispatch => {
		const blog = await blogService.create(blogObj)
		dispatch({
			type: 'NEW_BLOG',
			data: blog
		})
	}
}

export const updateBlog = ( blogObj ) => {
	return async dispatch => {
		await blogService.update(blogObj)
		dispatch({
			type: 'UPDATE',
			data: blogObj
		})
	}
}

export const deleteBlog = ( blogObj ) => {
	return async dispatch => {
		await blogService.remove( blogObj )
		dispatch({
			type: 'DELETE',
			data: blogObj
		})
	}
}

export default reducer