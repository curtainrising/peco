require('dotenv').config()
const express = require('express');
const bodyParser= require('body-parser')
const graphql = require('./api/routes/graphql');
const cors = require('cors')
const mongoHelper = require('./helpers/mongoHelper');
// const { login, register, removeUser } = require('./api/routes/user');
const app = express()

app.use(bodyParser.json());
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, access-token');
	res.header('Content-Type', "application/json; charset=utf-8");
	next();
});
app.use(cors()) // comment this out to provoke CORS error

mongoHelper.init(app);
graphql.init(app);

app.listen(8083);
console.log('Running a graphql API server at http://localhost:8083/graphql');
