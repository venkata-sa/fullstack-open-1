import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const GET_AUTHORS = gql`
	{
		allAuthors {
			name,
			born,
			bookCount
		}
	}
`

const GET_BOOKS = gql`
	{
		allBooks {
			title,
			published,
			genres,
			author {
				name,
				born,
				bookCount
			}
		}
	}
`

const NEW_BOOK = gql`
	mutation newBook ( $title: String!, $author: String!, $genres: [String!]!, 
		$published: Int!, $born: Int, $bookCount: Int ) {
		addBook (
			title: $title,
			author: $author,
			genres: $genres,
			published: $published,
			born: $born,
			bookCount: $bookCount
		) {
			id
			title
			genres
			published
			author {
				name,
				born,
				bookCount
			}
		}
	}
`

const SET_YEAR = gql`
	mutation setYear ( $name: String!, $born: Int! ) {
		editAuthor (
			name: $name,
			setBornTo: $born
		) {
			name,
			born,
			bookCount
		}
	}
`

const App = () => {
	const [page, setPage] = useState('authors')

	const authors = useQuery( GET_AUTHORS )
	const books = useQuery( GET_BOOKS )
	const [newBook] = useMutation( NEW_BOOK, {
		refetchQueries: [{ query: GET_BOOKS }, { query: GET_AUTHORS }]
	})

	const [setYear] = useMutation( SET_YEAR, {
		refetchQueries: [{ query: GET_AUTHORS }]
	})

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
			</div>

			<hr />

			<Authors
				show={page === 'authors'}
				result = { authors }
				setYear = { setYear }
			/>

			<Books
				show={page === 'books'}
				result = { books }
			/>

			<NewBook
				show={page === 'add'}
				result = { newBook }
			/>

		</div>
	)
}

export default App