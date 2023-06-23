const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
// require('dotenv').config();
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:8080'
}))
app.use(cookieParser());

let routes = require('./api/routes') //importing route
routes(app)

app.use(function (req, res) {
    res.status(404).send({ message: req.originalUrl + ' not found' })
})

app.listen(port)

console.log('RESTful API server started on: ' + port)
