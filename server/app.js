const express = require('express');
const config = require('config');
const bodyParser= require('body-parser')
const { login, register, removeUser } = require('./api/routes/user');
const mongoHelper = require('./helpers/mongoHelper');
const app = express()
mongoHelper.init(app);

app.use(bodyParser.json());
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, access-token');
	res.header('Content-Type', "application/json; charset=utf-8");
	next();
});

app.post('/register', register);
app.post('/login',login)
app.delete('/user/:userId', removeUser);
// app.get('/user/:userId',getUser)
// app.post('/user/:userId/students',addStudent)
// app.put('/user/:userId/students',updateStudents)
// app.put('/user/:userId/students/:studentId',updateStudent)
// app.post('/user/:userId/classes',addClass);
// app.put('/user/:userId/classes',updateClasses);
// app.put('/user/:userId/classes/:classId',updateClass);
// app.post('/user/:userId/teachers',addTeacher);
// app.put('/user/:userId/teachers/:teacherId',updateTeacher);

app.listen(8081);
console.log('8081')
