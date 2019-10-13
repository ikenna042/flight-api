const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const Joi = require('@hapi/joi');
const Staff = require('../models/staff');
// import Staff, { schemaCreate, schemaUpdate, schemaLogin } from "../models/staff";

exports.createRecord = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const staff = new Staff({
                email: req.body.email,
                password: hash
            });
            staff.save().then(
                () => {
                    res.status(201).json({
                        message: 'Staff added successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    );

};

exports.login = (req, res, next) => {
    Staff.findOne({ email: req.body.email }).then(
      (staff) => {
        if (!staff) {
          return res.status(401).json({
            error: new Error('Staff not found!')
          });
        }
        bcrypt.compare(req.body.password, staff.password).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }
            const token = jwt.sign(
                { staffId: staff._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' });
            res.status(200).json({
              staffId: staff._id,
              token: token
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  }
