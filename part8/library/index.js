const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')

let books = require('./books')

const typeDefs = gql`
	type Author {
		author: String!
		bookCount: Int!
		born: Int
	}

	type Book {
		id: ID!
		title: String!
		author: Author!
		published: Int
		genre: [String!]!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: [String]): [Book!]
		allAuthors: [Author!]!
	}

	type Mutation {
		addBook (
			title: String!
			author: String!
			published: Int
			genre: [String!]!
		): Book,
		editAuthor (
			name: String!
			setBornTo: Int!
		): Author
	}
`

const resolvers = {
	Query: {
		bookCount: () => books.length,
		authorCount: () => {
			const count = []
			books.forEach( b => {
				if (!count.includes( b.author )) count.push(b.author)
			})
			return count.length
		},
		allBooks: (root, args) => {
			let toReturn = books

			if( !args.author && !args.genre ) return toReturn
			if( args.hasOwnProperty( 'author' ) ) toReturn = toReturn.filter( b => b.author === args.author )
			if( args.hasOwnProperty( 'genre' ) ) {
				for( let x of args.genre ) toReturn = toReturn.filter( b => b.genre.includes(x) )
			}
			
			return toReturn
		},
		allAuthors: () => {
			const map = new Map()
			books.forEach( b => {
				if (!map.get( b.author )) map.set(b.author,1)
				else map.set( b.author, map.get( b.author ) + 1 )
			})
			const arr = []
			for( let [key, value] of map.entries() ){
				arr.push({ author: key, bookCount: value })
			}
			return arr
		}
	},
	Book: {
		author: (root) => {
			return {
				author: root.author,
				bookCount: root.bookCount,
				born: root.born
			}
		}
	},
	Mutation: {
		addBook: ( root,args ) => {
			const book = { ...args, id: uuid() }
			books = books.concat(book)
			return book
		}
	},
	Mutation: {
		editAuthor: (root, args) => {
			const author = books.find( b => b.author === args.name )
			if( !author ) return null

			author.born = args.setBornTo
			books = books.map( b => b.author === args.name ? author : b )
			return author
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})