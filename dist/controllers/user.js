"use strict";

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var User = require('../models/user');

exports.signup = function (req, res, next) {
  bcrypt.hash(req.body.password, 10).then(function (hash) {
    var user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(function () {
      res.status(201).json({
        message: 'User added successfully!'
      });
    })["catch"](function (error) {
      res.status(500).json({
        error: error
      });
    });
  });
};

exports.login = function (req, res, next) {
  User.findOne({
    email: req.body.email
  }).then(function (user) {
    if (!user) {
      return res.status(401).json({
        error: new Error('User not found!')
      });
    }

    bcrypt.compare(req.body.password, user.password).then(function (valid) {
      if (!valid) {
        return res.status(401).json({
          error: new Error('Incorrect password!')
        });
      }

      var token = jwt.sign({
        userId: user._id
      }, 'RANDOM_TOKEN_SECRET', {
        expiresIn: '24h'
      });
      res.status(200).json({
        userId: user._id,
        token: token
      });
    })["catch"](function (error) {
      res.status(500).json({
        error: error
      });
    });
  })["catch"](function (error) {
    res.status(500).json({
      error: error
    });
  });
};