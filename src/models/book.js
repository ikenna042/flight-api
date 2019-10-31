/* eslint-disable import/no-cycle */
/**
 * @author 4Decoder
 * @property {ObjectId} id Thing ObjectId primaryKey
 * @property {String} title Thing title (required)
 * @property {String} imageUrl Thing imageUrl (required)
 * @property {String} userId Thing userId (required)
 * @property {Number} price Thing price (required)
 * @description Thing holds record of all items in the store.
 */

const mongoose = require('mongoose');
const ObjectId = mongoose.Types;

const uniqueValidator = require('mongoose-unique-validator');

const bookSchema = mongoose.Schema({
    name: { type: ObjectId, ref: "User", required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    class: { type: String, required: true },
    price: { type: Number },
    payment: { type: String, required: false },
    staffId: { type: String }
});

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', bookSchema);
