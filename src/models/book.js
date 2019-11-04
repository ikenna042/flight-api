/* eslint-disable import/no-cycle */
/**
 * @author 4Decoder
 * @property {ObjectId} id Book ObjectId primaryKey
 * @property {String} name Book name (required)
 * @property {String} from Book from (required)
 * @property {String} to Book to (required)
 * @property {String} classe Book classe (required)
 * @property {String} userId Book userId (required)
 * @property {Number} price Book price (required)
 * @description Book holds record of all bookings.
 */

const mongoose = require('mongoose');
const ObjectId = mongoose.Types;

const uniqueValidator = require('mongoose-unique-validator');

const bookSchema = mongoose.Schema({
    name: { type: ObjectId, ref: "User", required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    classe: { type: String, required: true },
    price: { type: Number },
    payment: { type: String, required: false },
    staffId: { type: String }
});

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', bookSchema);
