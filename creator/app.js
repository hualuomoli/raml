var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var multer = require('multer');
var colors = require('colors');

var config = require('./config/config').setConfig();
var logger = require('./logger/logger');
var routes = require('./routes');

var app = express();

// set port
app.set('port', process.env.PORT || config.port);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, './favicon.ico')));
// morgan
app.use(morgan('dev'));
// file upload
app.use(multer({
  dest: path.join(__dirname, 'uploads')
}));
// parse application/json 
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse cookie
app.use(cookieParser());
// session
app.use(session({
  name: "administrator", // cookie的名称
  secret: 'hualuomoli',
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 30
  },
  resave: false,
  rolling: true,
  saveUninitialized: false
}))

// static
// app.use(express.static(path.join(__dirname, 'public')));

// development
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'src')));


app.use('/file', express.static(path.join(__dirname, 'files')));



// route
routes(app);

app.listen(app.get('port'), function () {
  logger.debug('server started in ' + app.get('port'));
})

// export
module.exports = app;