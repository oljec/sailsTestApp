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
        console.log(data);

        var errors = [];
        if ( !data.email ) {
            errors.push("Email field is empty");
        }
        if ( !data.password ) {
            errors.push("Password field is empty");
        }

        if (errors.length != 0) {
            res.json(200, {
                state: 'fail',
                errorMsg: errors
            });
        } else {
            passport.authenticate('local', function (err, user, info) {
                if ((err) || (!user)) {
                    return res.json(200, {
                        state: 'fail',
                        errorMsg: [info.message]
                    });
                }
                req.logIn(user, function (err) {
                    if (err) res.send(err);
                    return res.json(200, {
                        state: 'done',
                        email: data.email
                    });
                });

            })(req, res);
        }
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

        var errors = [];
        if ( !data.email ) {
            errors.push("Email field is empty");
        }
        if ( !data.password ) {
            errors.push("Password field is empty");
        }
        if ( !data.passwordConfirm ) {
            errors.push("Password confirmation field is empty");
        }

        if (errors.length != 0) {
            res.json(200, {
                state: 'fail',
                errorMsg: errors
            });
        } else {
            if (data.password === data.passwordConfirm) {
                User.findOne({email: data.email}).exec(function (err, existUser) {
                    if (err) return res.send(500);

                    if (typeof existUser !== 'undefined') {
                        res.json(200, {
                            state: 'fail',
                            errorMsg: ["User exists with such email"]
                        });
                    } else {
                        var newUser = {
                            email: data.email,
                            password: data.password
                        };

                        User.create(newUser).exec(function (err, user) {
                            if (err) return res.send(500);

                            if ((err) || (!user)) {
                                res.json(200, {
                                    state: 'fail',
                                    errorMsg: ["User wasn't created. Please contact us for help."]
                                });
                            } else {

                                Mailer.sendVerifMail({
                                    email: user.email,
                                    link: '/signUp-finish?token=' + user.activateLink
                                });

                                res.json(200, {
                                    state: 'done',
                                    email: data.email
                                });
                            }
                        });
                    }
                });
            } else {
                res.json(200, {
                    state: 'fail',
                    errorMsg: ["Passwords didn't match"]
                });
            }
        }
    },

    signUpFinish : function(req, res){
        console.log(req.param('token'));

        User.update(
            {activateLink: req.param('token')},
            {activateLink:'', state:'active'})
            .exec(function afterwards(err, updated){

            if (err) {
                // handle error here- e.g. `res.serverError(err);`
                return;
            }

            res.view('signUp-finish');
        });
    }
};

