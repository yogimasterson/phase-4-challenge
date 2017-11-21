const express = require('express')
const app = express()

const routes = require('./routes/')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static('public'))

app.use('/', routes)

app.listen(port, () => {
    console.log(`Listening on port: http://localhost:${port}`)
})