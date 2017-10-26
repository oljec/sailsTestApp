/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
        var sendData = {};

        if (req.isAuthenticated()){
            sendData.userEmail = req.user.email
        }

        res.view('homepage', sendData);
    }
};

