var mongoose = require('mongoose');

var events = require('events');
var myEmitter = new events.EventEmitter();


mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost/');

mongoose.connection.on('error', function(err) {
    console.error('Could not connect.  Error:', err);
});

var cookieParser = require('cookie-parser');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');
var bcrypt = require('bcryptjs');
var app = express();
var passport = require('passport');
var dishesArray = require('./js/dishes.js');
var session = require("express-session");
var server = http.Server(app);
var socket_io = require('socket.io');
var io = socket_io(server);

var LocalStrategy = require('passport-local').Strategy;


app.use(bodyParser.json());
app.use(express.static('build'));
app.use(cookieParser());
app.use(session({
    secret: 'whatever'
}));
app.use(passport.initialize());
app.use(passport.session());

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
        console.log('user was CREATED!');
        res.json(user);
    });

});


passport.use(new LocalStrategy(

    function(username, password, done) {

        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                console.log('Unkwown User');
                return done(null, false, {
                    message: 'Unknown User'
                });

            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;

                if (isMatch) {

                    console.log('You are Loggeeeeed in');

                    return done(null, user);


                } else {
                    console.log('Invalid Password');
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
            });
        });
    }));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});


function isLoggedIn(req, res, next) {
    /* For production */
    if (req.isAuthenticated()) {
        return next();
    }
    /* For testing, inject a user manually */
    if (process.env.NODE_ENV == 'test') {

        req.user = {
            '_id': '1',
            'username': 'test',
            'password': 'test'
        };
        return next();
    }

    res.sendStatus(403);
}




app.post('/login',

    passport.authenticate('local'),

    function(req, res) {

        res.json(req.user);

    });


app.get('/hidden', function(req, res) {

    console.log('using the path');

});

app.get('/', function(req, res) {

    res.render('index');

});


//   ENDPOINT FOR HANDLING DISHES
//
app.get('/order/:dateId', function(req, res) {
    console.log(req.params);
    var dateId= req.params.dateId;

    Order.find({
            user: req.user._id,
            dateId:dateId
        },

        function(err, data) {
            if (err) throw err;

            // show the one user
            res.json(data);
            console.log('found one DISH ARRAY:');


        });


});


app.put('/order', isLoggedIn, function(req, res) {

    console.log(req.body);

    var id = req.body._id;



    Order.findById(id, function(err, foundArray) {

        console.log('here is the found Array');
        console.log(foundArray);

        foundArray.update({

            user: req.user._id,
            week: [req.body.week],
            startDate: new Date(),
            endDate: new Date()

        }, function(err, order) {
            if (err) {

                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }

            res.status(201).json(order);
            console.log('oreder updated');
            console.log(order);

        });
    });

});

app.post('/order', function(req, res) {

    var dish = req.body.dish;
    var date = req.body.date;
    var dateId= req.body.dateId;

    var query = {
        user: req.user._id,
        date: req.body.date,
        dateId:req.body.dateId
    };

    var update = {
        $push: {
            dishes: {
                dish: dish,

            }
        },

        $inc: {
            total: req.body.price
        }
    };

  Order.findOneAndUpdate(query, update, {
        upsert: true,
        new: true
    }, function(err, data) {

        console.log(err);

        res.status(201).json(data);

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
