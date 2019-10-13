"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRecord = createRecord;
exports.login = login;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _staff = _interopRequireWildcard(require("../models/staff"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// exports.createRecord = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10).then(
//         (hash) => {
//             const staff = new Staff({
//                 email: req.body.email,
//                 password: hash
//             });
//             staff.save().then(
//                 () => {
//                     res.status(201).json({
//                         message: 'Staff added successfully!'
//                     });
//                 }
//             ).catch(
//                 (error) => {
//                     res.status(500).json({
//                         error: error
//                     });
//                 }
//             );
//         }
//     );
// };
function createRecord(_x, _x2) {
  return _createRecord.apply(this, arguments);
} // exports.login = (req, res, next) => {
//     Staff.findOne({ email: req.body.email }).then(
//       (staff) => {
//         if (!staff) {
//           return res.status(401).json({
//             error: new Error('Staff not found!')
//           });
//         }
//         bcrypt.compare(req.body.password, staff.password).then(
//           (valid) => {
//             if (!valid) {
//               return res.status(401).json({
//                 error: new Error('Incorrect password!')
//               });
//             }
//             const token = jwt.sign(
//                 { staffId: staff._id },
//                 'RANDOM_TOKEN_SECRET',
//                 { expiresIn: '24h' });
//             res.status(200).json({
//               staffId: staff._id,
//               token: token
//             });
//           }
//         ).catch(
//           (error) => {
//             res.status(500).json({
//               error: error
//             });
//           }
//         );
//       }
//     ).catch(
//       (error) => {
//         res.status(500).json({
//           error: error
//         });
//       }
//     );
//   }


function _createRecord() {
  _createRecord = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var data, _Joi$validate, error, email, duplicate, newRecord, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = req.body;
            if (hasProp(data, "password")) data.password = hash(req.body.password);
            _Joi$validate = _joi["default"].validate(data, _staff.schemaCreate), error = _Joi$validate.error;

            if (!error) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", fail(res, 422, "Error validating request data. ".concat(error.message)));

          case 5:
            email = data.email;
            _context.next = 8;
            return _staff["default"].findOne({
              $or: [{
                email: email
              }, {
                phone: phone
              }]
            }).exec();

          case 8:
            duplicate = _context.sent;

            if (!duplicate) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", fail(res, 422, "Error! Record already exist for ".concat(email, " or ").concat(phone)));

          case 11:
            newRecord = new _staff["default"](data);
            _context.prev = 12;
            _context.next = 15;
            return newRecord.save();

          case 15:
            result = _context.sent;

            if (result) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", notFound(res, "Error: Bad Request: Model not found"));

          case 18:
            return _context.abrupt("return", success(res, 201, result, "Record created successfully!"));

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](12);
            return _context.abrupt("return", fail(res, 500, "Error creating record. ".concat(_context.t0.message)));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[12, 21]]);
  }));
  return _createRecord.apply(this, arguments);
}

function login(_x3, _x4) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _Joi$validate2, error;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _Joi$validate2 = _joi["default"].validate(req.body, _staff.schemaLogin), error = _Joi$validate2.error;

            if (!error) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", fail(res, 222, "Error validating request data. ".concat(error.message)));

          case 3:
            return _context2.abrupt("return", staffAuthenticate(req.body).then(function (_ref) {
              var token = _ref.token,
                  user = _ref.user;
              return success(res, 201, {
                token: token,
                user: user
              }, "Login was successful!");
            })["catch"](function (err) {
              return fail(res, 500, err.message);
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _login.apply(this, arguments);
}