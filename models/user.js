/* eslint-disable import/no-cycle */
/**
 * @author 4Decoder
 * @property {ObjectId} id User ObjectId primaryKey
 * @property {String} email User email (required)
 * @property {String} password User password (required)
 * @description User holds record of all users in the store.
 */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);