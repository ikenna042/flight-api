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

const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Thing', thingSchema);
