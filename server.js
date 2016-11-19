var mongoose = require('mongoose');

var events = require('events');
var myEmitter = new events.EventEmitter();


mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost/');

mongoose.connection.on('error', function(err) {
    console.error('Could not connect.  Error:', err);
});


var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');
var bcrypt = require('bcryptjs');
var app = express();
var passport = require('passport');
var dishesArray = require('./js/dishes.js');

var server = http.Server(app);
var socket_io = require('socket.io');
var io = socket_io(server);

var LocalStrategy = require('passport-local').Strategy;


app.use(bodyParser.json());
app.use(express.static('build'));

var User = require('./models/users.js');
var Order = require('./models/order.js');


io.on('connection', function(socket) {

    console.log('connected to socket');

});




passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }
));


app.get('/dishes', function(req, res) {

    res.json(dishesArray);

});




// USER AUTH//
//
//
app.use(passport.initialize());


app.get('/hidden', passport.authenticate('basic', {
    session: false
}), function(req, res) {

    console.log('sercret message');
    console.log(req.body.username);

    res.json({
        message: 'Luke... I am your father'
    });


});

app.post('/users', function(req, res) {



    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }

    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    var username = req.body.username;

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({
            message: 'Incorrect field length: username'
        });
    }

    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }

    var password = req.body.password;

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }

    var newUser = new User({

        username: username,
        password: password

    });

    User.createUser(newUser, function(err, user) {
        if (err) throw err;
        console.log(user);

    });

});


passport.use(new LocalStrategy(
    function(username, password, done) {

        User.getUserByUsername(username, function(err, user) {

            if (err) throw err;

            if (!user) {
                return done(null, false, {
                    message: 'Unknown User'
                });
            }

            console.log(user);

            User.comparePassword(password, user.password, function(err, res) {

                if (err) throw err;

                if (res) {
                    return done(null, user);

                } else {
                    return done(null, false, {
                        message: 'invalid password'
                    });
                }

            });

            console.log('user logged in!');
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/');
    });


app.get('/hidden', function(req, res) {

    console.log('using the path');

});

app.get('/', function(req, res) {

    console.log('using the path');

});


//   ENDPOINT FOR HANDLING DISHES

app.post('/order', function(req, res) {

  console.log(req.body);

    Order.create({

      week:req.body

    }, function(err, order) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(order);
        console.log(order);
        console.log('oreder succeeded');
    });

});




/// running the server; //
///
///

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        server.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);


            if (callback) {
                callback();
            }
        });
    });
};



if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}
