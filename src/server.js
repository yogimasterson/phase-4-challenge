require('dotenv').config()
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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./src/public'))

app.use(session({
  store: new pgSession({
    conString: process.env.DATABASE_URL,
  }),
  key: 'user_sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
}))

app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

app.use('/', routes)

app.use((req, res) => {
  res.status(404).render('common/not_found')
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
