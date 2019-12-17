const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
	try {
		const users = await User
			.find({})
			.populate('blogs', { author: 1, title: 1, url: 1, id: 1 })
		response.json( users.map( user => user.toJSON() ) )
	}
	catch (exception) {
		next(exception)
	}	
})

usersRouter.post('/', async (request, response, next) => {
	try {
		const body = request.body

		if( body.username.length < 3 || body.password.length < 3 ) {
			return response.json({
				error: 'Username and password must have min length of 3'
			})
		}

		const saltRounds = 10
		const passwordHash = await bcrypt.hash(body.password, saltRounds)

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
		})

		const savedUser = await user.save()

		response.json(savedUser)
	} catch (exception) {
		next(exception)
	}
})

module.exports = usersRouter