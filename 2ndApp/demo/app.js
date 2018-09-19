var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var mongoose = require('mongoose');
var config= require('config');
var bodyParser = require('body-parser');

 mongoose.connect(config.DBHost,{ useNewUrlParser:true});
 let db =mongoose.connection;
 db.on('error',console.error.bind(console,'connection error:'));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var custRouter= require('./routes/cust');
var app = express();
// app.configure(function(){
//   app.use(express.bodyParser());
//   app.use(app.router);
// });

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var sendRes = function(ref, obj, status, code) {
	if(status == 1) {
		ref.send(obj);
	} else {
		ref.status(code).send(obj);
	}
}

app.post('/api/login', function(req, res) {

		var email = req.body.email;
		var password = req.body.password;
		if(email != 'test@gmail.com') {
			sendRes(res, {msg: 'Email does not exist', code: 0}, 0, 403);
			return;
		}
		if(password != '123456') {
			sendRes(res, {msg: 'Password is invalid', code: 1}, 0, 403);
			return;
		}
		sendRes(res, {msg: 'success', code: 3}, 1, 200);

})




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cust', custRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	  res.setHeader('Access-Control-Allow-Origin','http://localhost:3009');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);


  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
