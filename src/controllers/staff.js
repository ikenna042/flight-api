const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Staff = require('../models/staff');

exports.createRecord = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const staff = new Staff({
                email: req.body.email,
                password: hash,
                surname: req.body.surname,
                firstname: req.body.firstname,
                gender: req.body.gender,
                birth_date: req.body.birth_date,
                phone: req.body.phone
            });
            staff.save().then(
                () => {
                    res.status(201).json({
                        message: 'Staff added successfully!',
                        staff
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
            error: 'Staff not found!'
          });
        }
        bcrypt.compare(req.body.password, staff.password).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: 'Incorrect password!'
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

  exports.getAll = (req, res, next) => {
    Staff.find().then(
        (staff) => {
            res.status(200).json(staff);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
  };

  exports.getRecord = (req, res, next) => {
    Staff.findOne({
      _id: req.params.id
    }).then(
      (staff) => {
        res.status(200).json(staff);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  exports.updateRecord = (req, res, next) => {
    let staff = new Staff({ _id: req.params._id });
    
      staff = {
        _id: req.params.id,
        email: req.body.email,
        password: req.body.password,
        surname: req.body.surname,
        firstname: req.body.firstname,
        gender: req.body.gender,
        birth_date: req.body.birth_date,
        phone: req.body.phone
      } 
    Staff.updateOne({_id: req.params.id}, staff).then(
      () => {
        res.status(201).json({
          message: 'Staff updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.deleteRecord = (req, res, next) => {
    Staff.findOne({_id: req.params.id}).then(
      (staff) => {
        
          Staff.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Staff Deleted!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
      }
    );
  };