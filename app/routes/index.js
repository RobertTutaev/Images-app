// Работаем с маршрутами
var express = require('express');
var router  = express.Router();
var passport= require('passport');
var bcrypt  = require('bcrypt-nodejs');
var models  = require('../models/models');
var config  = require('../config');
var socket  = require('socket.io-client')('http://'+config.io.host + ':' + config.io.port);
var multer  = require('multer');
var upload  = multer({dest: './public/images/', fileFilter: fileFilter});
var fs      = require('fs');

// Проверяем расширение файла, так как необходима только картинка
function fileFilter (req, file, cb){
  var type = file.mimetype;
  var typeArray = type.split("/");
  if (typeArray[0] === "image" ) {
    cb(null, true);
  }else {
    cb(null, false);
  }
}

// Требуем аунтефикации для доступа к маршрутам
var mustAuthenticatedMw = function (req, res, next){
    req.isAuthenticated()
        ? next()
        : res.redirect('/signin');
};
router.all(['/upload', '/show'], mustAuthenticatedMw);

// Требуем прав администратора для доступа к маршрутам
var mustAdminMw = function (req, res, next){
    var user = req.user;
    if(user !== undefined) {
        user = user.toJSON();
    }
    
    user.is_admin
        ? next()
        : res.redirect('/');
};
router.all(['/show'], mustAdminMw);

// Основные маршруты ===========================================================

// Главная
router.get('/', function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.render('index', {title: 'Главная'});
    } else {
        var user = req.user;
        if(user !== undefined) {
            user = user.toJSON();
        }
        res.render('index', {title: 'Главная', username: user.username, is_admin: user.is_admin});
    }
});

// Загрузка изображения 1
router.get('/upload', function(req, res, next) {
    res.render('upload', {title: 'Загрузка изображения'});
});

// Загрузка изображения 2
router.post('/upload', upload.single('image'), function(req, res, next) {
    if (req.file) {
        var NewFile = new models.File({
            user_id: req.user.id,
            name_orig: req.file.originalname,
            name_temp: req.file.filename,
            comment: req.body.comment
        });

        NewFile.save().then(function() {
            socket.emit('message', {
                name_temp: req.file.filename, 
                name_orig: req.file.originalname,
                comment:   req.body.comment});
        }).then(function() {
            res.redirect('/');
        });
    } else {
        res.render('upload', {title: 'Загрузка изображения', errorMessage: 'Файл не загружен!'});
    }
    
});

// Просмотр изображений
router.get('/show', function(req, res, next) {
    models.getFiles().then(function(rows) {       
       res.render('show', {title: 'Просмотр изображений', config: config, rows: rows});
    });
});

// Вход 1
router.get('/signin', function(req, res, next) {
    if(req.isAuthenticated()) res.redirect('/');
    res.render('signin', {title: 'Вход'});
});

// Вход 2
var signInPost = function(req, res, next) {
    passport.authenticate(
        'local', 
        { 
            successRedirect: '/',        
            failureRedirect: '/signin'
        }, 
        function(err, user, info) {
                if(err) {
                    return res.render('signin', {title: 'Вход', errorMessage: err.message});
                }
                
                if(!user) {
                    return res.render('signin', {title: 'Вход', errorMessage: info.message});
                }

                return req.logIn(user, function(err) {                    
                    if(err) {
                        return res.render('signin', {title: 'Вход', errorMessage: err.message});
                    } else {                        
                        return res.redirect('/');
                    }
                });
        })(req, res, next);
    };    
router.post('/signin', signInPost);

// Регистрация 1
router.get('/signup', function(req, res, next) {
    if(req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('signup', {title: 'Регистрация'});
    }
});

// Регистрация 2
router.post('/signup', function(req, res, next) {
    var user = req.body;
    var usernamePromise = null;
    
    usernamePromise = new models.User({username: user.username}).fetch();
    
    return usernamePromise.then(function(User) {
        if(User) {
            res.render('signup', {title: 'signup', errorMessage: 'Пользователь уже существует'});
        } else {
            var NewUser = new models.User({
                username: user.username, 
                password: bcrypt.hashSync(user.password), 
                is_admin: user.is_admin === '1' ? 1 : 0
            });
            
            NewUser.save().then(function(models) {
                signInPost(req, res, next);
            });	
        }
    });
});

// Выход
router.get('/signout', function(req, res, next) {
    if(!req.isAuthenticated()) {
        notFound404(req, res, next);
    } else {
        req.logout();
        res.redirect('/');
    }
});

module.exports = router;