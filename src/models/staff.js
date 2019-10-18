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
// const Schema = mongoose;
// const ObjectId = Schema.Types;

const staffSchema = mongoose.Schema({
    // email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    surname: { type: String, required: false },
    firstname: { type: String, required: false },
    middlename: { type: String },
    gender: { type: String, required: false },
    birth_date: { type: Date, required: false },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
        // eslint-disable-next-line no-useless-escape
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"],
    }
    // created_by: { type: ObjectId, ref: "Staff", required: true },
    // updated_by: { type: ObjectId, ref: "Staff" },
    // password: { type: String, required: true }
});

staffSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Staff', staffSchema);

// import mongoose from "mongoose";
// import Joi from "@hapi/joi"
// import { DATABASE } from "../constants";

// const { Schema } = mongoose;
// const { ObjectId } = Schema.Types;

// export const schemaLogin = {
//     email: Joi.string().trim().email().required(),
//     password: Joi.string().required(),
// };

// export const schemaCreate = {
//     surname: Joi.string().required(),
//     firstname: Joi.string().required(),
//     middlename: Joi.string().optional(),
//     gender: Joi.string().valid(["MALE, FEMALE"]).required(),
//     birth_date: Joi.date().required(),
//     phone: Joi.string().required(),
//     email: Joi.string().trim().email().required(),
//     created_by: Joi.string().required(),
// };

// export const schemaUpdate = {
//     surname: Joi.string().optional(),
//     firstname: Joi.string().optional(),
//     middlename: Joi.string().optional(),
//     gender: Joi.string().valid(["MALE, FEMALE"]).optional(),
//     birth_date: Joi.date().optional(),
//     phone: Joi.string().optional(),
//     email: Joi.string().trim().email().optional(),
//     updated_by: Joi.string().required(),
// };

// export const schema = {
//     surname: { type: String, required: true },
//     firstname: { type: String, required: true },
//     middlename: { type: String },
//     gender: { type: String, required: true },
//     birth_date: { type: Date, required: true },
//     phone: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true,
//         unique: true,
//         // eslint-disable-next-line no-useless-escape
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//             "Please fill a valid email address"],
//     },
//     created_by: { type: ObjectId, ref: "Staff", required: true },
//     updated_by: { type: ObjectId, ref: "Staff" },
// };

// const options = DATABASE.OPTIONS;

// const newSchema = new Schema(schema, options);
// newSchema.set("collection", "staff");
// const Staff = mongoose.model("Staff", newSchema);

// export default Staff;
