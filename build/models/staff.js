"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.schema = exports.schemaUpdate = exports.schemaCreate = exports.schemaLogin = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/no-cycle */

/**
 * @author 4Decoder
 * @property {ObjectId} id User ObjectId primaryKey
 * @property {String} email User email (required)
 * @property {String} password User password (required)
 * @description User holds record of all users in the store.
 */
// const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
// const userSchema = mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });
// userSchema.plugin(uniqueValidator);
// module.exports = mongoose.model('User', userSchema);
var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.Types.ObjectId;
var schemaLogin = {
  email: _joi["default"].string().trim().email().required(),
  password: _joi["default"].string().required()
};
exports.schemaLogin = schemaLogin;
var schemaCreate = {
  surname: _joi["default"].string().required(),
  firstname: _joi["default"].string().required(),
  middlename: _joi["default"].string().optional(),
  gender: _joi["default"].string().valid(["MALE, FEMALE"]).required(),
  birth_date: _joi["default"].date().required(),
  phone: _joi["default"].string().required(),
  email: _joi["default"].string().trim().email().required(),
  created_by: _joi["default"].string().required()
};
exports.schemaCreate = schemaCreate;
var schemaUpdate = {
  surname: _joi["default"].string().optional(),
  firstname: _joi["default"].string().optional(),
  middlename: _joi["default"].string().optional(),
  gender: _joi["default"].string().valid(["MALE, FEMALE"]).optional(),
  birth_date: _joi["default"].date().optional(),
  phone: _joi["default"].string().optional(),
  email: _joi["default"].string().trim().email().optional(),
  updated_by: _joi["default"].string().required()
};
exports.schemaUpdate = schemaUpdate;
var schema = {
  surname: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  middlename: {
    type: String
  },
  gender: {
    type: String,
    required: true
  },
  birth_date: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    // eslint-disable-next-line no-useless-escape
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
  },
  created_by: {
    type: ObjectId,
    ref: "Staff",
    required: true
  },
  updated_by: {
    type: ObjectId,
    ref: "Staff"
  }
};
exports.schema = schema;
var options = _constants.DATABASE.OPTIONS;
var newSchema = new Schema(schema, options);
newSchema.set("collection", "staff");

var Staff = _mongoose["default"].model("Staff", newSchema);

var _default = Staff;
exports["default"] = _default;