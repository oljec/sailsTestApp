/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res){
        res.view('login');
    },

    store: function(req, res){
        var data = req.body;

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.view('login', {
                    errorMsg: info.message,
                    email: data.email
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.redirect('/');
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    },

    signUp: function(req, res){
        res.view('signUp');
    },

    create: function(req, res){
        var data = req.body;
        console.log(data);

        if (data.password === data.passwordConfirm) {
            var newUser = {
                email: data.email,
                password: data.password
            };

            User.findOne({email:data.email}).exec(function (err, existUser){
                if (err) return res.send(500);

                if (typeof existUser !== 'undefined') {
                    res.view('signUp', {
                        errorMsg: "User exists with such email",
                        email: data.email
                    });
                } else {
                    User.create(newUser).exec(function (err, user) {
                        if (err) return res.send(500);

                        Mailer.sendWelcomeMail();  // <= Here we using

                        // EmailService.sendEmail();

                        res.redirect('/');

                    });
                }
            });
        } else {
            res.view('signUp', {
                errorMsg: "Passwords didn't match",
                email: data.email
            });
        }
    },


    showAll: function (req, res){
        res.redirect('/user');
    },

    someTesr: function (req, res){
        res.view('homepage');
    },

    addUser: function (req, res) {

        var data = {
            name        : req.param('name'),
            password    : req.param('password')
        };

        User.create(data).exec(function (err, user) {

            if (err) return res.send(500);

            res.redirect('/user');

        });
    },

    updateUser: function (req, res) {

        var userId = req.param('id');

        var updatedData = {
            name        : req.param('name'),
            password    : req.param('password')
        };

        User.update(userId, updatedData).exec(function (err) {
            res.redirect('/user');
        });
    }
};

