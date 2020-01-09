const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')

let books = require('./books')

const typeDefs = gql`
	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}
	type Author {
		name: String!
		born: Int
		id: ID!
		bookCount: Int
	}
	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: [String]): [Book!]
		allAuthors: [Author!]!
	}
	type Mutation {
		addBook(
		title: String!
		published: Int!
		author: String!
		genres: [String]
		bookCount: Int
		born: Int
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
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
			let toReturn = []
				for( let x of books ) {
					let ele = {...x}
					ele.name = ele.author
					toReturn.push(ele)
				}

			if( !args.author && !args.genres ) return toReturn
			if( args.hasOwnProperty( 'author' ) ) toReturn = toReturn.filter( b => b.author === args.author )
			if( args.hasOwnProperty( 'genres' ) ) {
				for( let x of args.genres ) toReturn = toReturn.filter( b => b.genres.includes(x) )
			}
			
			return toReturn
		},
		allAuthors: () => {
			const bCount = new Map()
			const bornMap = new Map()
			books.forEach( b => {
				if( !bCount.get( b.author ) ) {
					bCount.set(b.author, 1)
					bornMap.set( b.author, b.born !== undefined ? b.born : null )
				}
				else bCount.set( b.author, bCount.get( b.author ) + 1 )
			})
			const arr = []
			for( let [key, value] of bCount.entries() ) {
				let x = bornMap.get( key )
				console.log(x)
				arr.push({ name: key, bookCount: value, born: x })
			}	
			console.log( arr )		
			return arr
		}
	},
	Book: {
		author: (root) => {
			const mBorn = root.born === undefined ? null : root.born
			
			return {
				name: root.name,
				bookCount: root.bookCount,
				born: mBorn
			}
		}
	},
	Mutation: {
		addBook: (root, args) => {
			const book = { ...args, id: uuid(), name: args.author }
			books = books.concat(book)
			return book
		},
		editAuthor: (root, args) => {
			const author = books.find( b => b.author === args.name )
			if( !author ) return null

			author.born = args.setBornTo
			author.name = author.author
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