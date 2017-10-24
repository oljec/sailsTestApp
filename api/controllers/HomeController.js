/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
	index: function(req, res){
        var sendData = {};

        if (req.isAuthenticated()){
            sendData.userEmail = req.user.email
        }

        sendData.userLink = bcrypt.hashSync('2', '1');

        res.view('homepage', sendData);
    }
};

