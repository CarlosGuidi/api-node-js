const express = require('express')
const app = express()
const porta = 3000
const routes = require('./routes/routes.js')
const bodyParser = require('body-parser')
const db = require('./db/db.js')

routes(app, porta, db, bodyParser)