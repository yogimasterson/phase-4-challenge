const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const port = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false,
}))

app.use(session({
  key: user_sid,
  store: new pgSession({
    conString: process.env.DATABASE_URL,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000,
  },
}))

app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

app.use('/', routes)

app.use((req, res) => {
  res.status(404).render('not_found')
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
