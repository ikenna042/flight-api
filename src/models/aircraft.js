/* eslint-disable import/no-cycle */
/**
 * @author 4Decoder
 * @property {ObjectId} id Aircraft ObjectId primaryKey
 * @property {String} name Aircraft name (required)
 * @property {String} model Aircraft model (required)
 * @property {String} serial Aircraft serial (required)
 * @property {String} owner Aircraft owner (required)
 * @property {String} worth Aircraft worth (required)
 * @description Aircraft holds record of all aircrafts.
 */

const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const aircraftSchema = mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    serial: { type: Number, required: true },
    owner: { type: String, required: true },
    worth: { type: Number }
});

aircraftSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Aircraft', aircraftSchema);
