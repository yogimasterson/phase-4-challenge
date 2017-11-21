const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const port = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false,
}))

app.use('/', routes)

app.use((req, res) => {
  res.status(404).render('not_found')
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
