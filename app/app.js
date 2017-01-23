var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var bcrypt          = require('bcrypt-nodejs');
var path            = require('path');
var passport        = require('passport');                                      // Для passport
var LocalStrategy   = require('passport-local').Strategy;                       // Для passport
var routes          = require('./routes/index');
var models          = require('./models/models');
var http            = require('http');                                          // Для io
var server          = http.createServer(app);                                   // Для io
var config          = require('./config');                                      // Для io
var io              = require('socket.io').listen(server, config.io.options);   // Для io
var app             = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'test',
    saveUninitialized: true,
    resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Работаем с passport =========================================================
passport.use(new LocalStrategy(function(username, password, done) {
    new models.User({username: username}).fetch().then(function(data) {
        var user = data;
        if(user === null) {
            return done(null, false, {message: 'Неверный логин!'});
        } else {
            user = data.toJSON();
            if(!bcrypt.compareSync(password, user.password)) {
                return done(null, false, {message: 'Неверный пароль!'});
            } else {            
                return done(null, user);
            }
        }
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    new models.User({username: username}).fetch().then(function(user) {
        done(null, user);
    });
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user){
    err 
      ? done(err)
      : done(null,user);
  });
});

// Работаем с io ===============================================================
server.listen(config.io.port);

io.sockets.on('connection', function (client) {
    client.on('message', function (message) {
        try {
            client.broadcast.emit('message', message);
        } catch (e) {
            client.disconnect();
        }
    });
});

module.exports = app;