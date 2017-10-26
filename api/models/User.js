/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      maxLength: 100,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      maxLength: 100
    },
    state: {
      type: 'string',
      required: true,
      maxLength: 100,
      enum: ['blocked', 'active', 'notVerify'],
      defaultsTo: 'notVerify'
    },
    activateLink: {
      type: 'string',
      defaultsTo: '',
      maxLength: 100
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          user.activateLink = bcrypt.hashSync(user.email, salt);
          cb();
        }
      });
    });
  }
};

