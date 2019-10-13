"use strict";

var Thing = require('../models/thing');

var fs = require('fs');

exports.createThing = function (req, res, next) {
  req.body.thing = JSON.parse(req.body.thing);
  var url = req.protocol + '://' + req.get('host');
  var thing = new Thing({
    title: req.body.thing.title,
    description: req.body.thing.description,
    imageUrl: url + '/images/' + req.file.filename,
    price: req.body.thing.price,
    userId: req.body.thing.userId
  });
  thing.save().then(function () {
    res.status(201).json({
      message: 'Post saved successfully!'
    });
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
};

exports.getOneThing = function (req, res, next) {
  Thing.findOne({
    _id: req.params.id
  }).then(function (thing) {
    res.status(200).json(thing);
  })["catch"](function (error) {
    res.status(404).json({
      error: error
    });
  });
};

exports.updateThing = function (req, res, next) {
  var thing = new Thing({
    _id: req.params._id
  });

  if (req.file) {
    var url = req.protocol + '://' + req.get('host');
    req.body.thing = JSON.parse(req.body.thing);
    thing = {
      _id: req.params.id,
      title: req.body.thing.title,
      description: req.body.thing.description,
      imageUrl: url + '/images/' + req.file.filename,
      price: req.body.thing.price,
      userId: req.body.thing.userId
    };
  } else {
    thing = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    };
  }

  Thing.updateOne({
    _id: req.params.id
  }, thing).then(function () {
    res.status(201).json({
      message: 'Thing updated successfully!'
    });
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
};

exports.deleteThing = function (req, res, next) {
  Thing.findOne({
    _id: req.params.id
  }).then(function (thing) {
    var filename = thing.imageUrl.split('/images/')[1];
    fs.unlink('images/' + filename, function () {
      Thing.deleteOne({
        _id: req.params.id
      }).then(function () {
        res.status(200).json({
          message: 'Deleted!'
        });
      })["catch"](function (error) {
        res.status(400).json({
          error: error
        });
      });
    });
  });
};

exports.getAllThings = function (req, res, next) {
  Thing.find().then(function (things) {
    res.status(200).json(things);
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
};