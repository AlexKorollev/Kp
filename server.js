const fs = require('fs')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const userdb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
const messagedb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
const middlewares = jsonServer.defaults()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

server.use(middlewares);
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use('/',(req, res, next) => setTimeout(() => next(), Math.floor(Math.random() * 1)))

const SECRET_KEY = '123456789'
const expiresIn = '10h'


// Create a token from a payload
function createToken(payload) {
	return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token
function verifyToken(token, cb) {
	return jwt.verify(token, SECRET_KEY, cb);
}

// Check if the user exists in database
function isAuthenticated({nickname, password}) {
	const userdb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
	return userdb.users.findIndex(user => user.nickname === nickname && user.password === password) !== -1
}

function findUser({nickname, password}) {
	const userdb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
	return userdb.users.find(user => user.nickname === nickname && user.password === password)
}

function findUsersByIds(userIds) {
  const userdb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
	let usersForReplies = []
	userIds.forEach(id => {
		const user = userdb.users.find(user => user.id === id)
		usersForReplies.push(user)
	})
  return usersForReplies
}

server.post('/comments/replies', (req, res) => {
  const userIds = req.body
  const usersForReplies = findUsersByIds(userIds)
  res.status(200).send(usersForReplies)
})


server.post('/auth/login', (req, res) => {
	const nickname = req.body.nickname
	const password = req.body.password

	if (isAuthenticated({nickname, password}) === false) {
		const status = 401
		const message = 'Incorrect email or password'
		res.status(status).json({status, message})
		return
	}
	const user = findUser({nickname, password})
	const access_token = createToken({nickname, password})
	res.status(200).json({access_token, user})
})

server.post('/auth/register', (req, res) => {
	const nickname = req.body.nickname
	const password = req.body.password
	if (findUser({nickname, password}) !== undefined) {
		const status = 401
		const message = 'This user already registered'
		res.status(status).json({status, message})
		return
	}
	const userdb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
	const id = userdb.users.length == 0 ? 1 : userdb.users[userdb.users.length - 1].id + 1;
	const user = req.body
	user.id = id
	db.get('users').push(user)
		.write()
	res.status(200).json(id)
})

server.use('/', (req, res, next) => {
  switch(req.path) {
    case '/users':
    case '/posts':
      break;
    default: 
      return next();
	}
	
	if (
    Object.keys(req.query).length == 7
		&& req.query.public == 'true'
		&& req.query._embed == 'comments'
		&& req.query._embed == 'likes'
    && req.query._page == '1'
    && req.query._limit == '5'
    && req.query._sort == 'id'
    && req.query._order == 'desc'
  ) return next();

  if (req.headers.authorization === undefined || req.headers.authorization === 'null') {
    const status = 401
    const message = 'Bad authorization header'
    return res.status(status).json({status, message})
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1], (err, decode) => decode ? next() : (function(){throw(err)})())
  } catch (err) {
    const status = 401
    const message = 'Error: access_token is not valid'
    return res.status(status).json({status, message})
  }
})

server.use(router);
server.listen(3000, () => {
	console.log('JSON Server is running on 3000')
})
