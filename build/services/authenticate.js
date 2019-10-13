"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.staffAuthenticate2Old = staffAuthenticate2Old;
exports.staffAuthenticate = staffAuthenticate;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _staff = _interopRequireDefault(require("../models/staff"));

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function staffAuthenticate2Old(loginPayload) {
  // return next();
  var email = loginPayload.email,
      phone = loginPayload.phone,
      otp = loginPayload.otp,
      password = loginPayload.password;
  return _staff["default"].findOne({
    $or: [{
      email: email
    }, {
      phone: phone
    }]
  }) // eslint-disable-next-line complexity
  .then(function (user) {
    if (!user) {
      throw new Error("Authentication failed. User not found.");
    }

    if (otp && phone) {
      if (!user.otp_access) {
        throw new Error("Authentication failed. OTP Access is ".concat(user.otp_access));
      }
    }

    if (!(_bcryptjs["default"].compareSync(password || "", user.password) || _bcryptjs["default"].compareSync(otp || "", user.otp))) {
      throw new Error("Authentication failed. Wrong password or otp.");
    }

    var query = {
      _id: user._id
    };
    var update = {
      otp_access: false
    };

    _staff["default"].findOneAndUpdate(query, update, {
      "new": true
    }).exec(); // Delete private attributes


    delete user.password;
    delete user.otp;
    var payload = {
      id: user.id,
      userType: "staff",
      // terminal_id: user.terminal_id,
      // role: user.role,
      // vehicle_id: user.vehicle_id,
      email: email,
      phone: phone,
      time: new Date()
    };

    var token = _jsonwebtoken["default"].sign(payload, _constants.JWT.jwtSecret, {
      expiresIn: "240h" // JWT.tokenExpireTime,

    });

    return {
      token: token,
      user: user
    };
  });
} // eslint-disable-next-line complexity


function staffAuthenticate(_x) {
  return _staffAuthenticate.apply(this, arguments);
} // export async function parentAuthenticate(loginPayload) {
//     // return next();
//     const { email, phone, otp, password } = loginPayload;
//     let user;
//     let token;
//     try {
//         const filter = {};
//         if (phone) {
//             filter.phone = phone;
//         } else {
//             filter.email = email;
//         }
//         user = await Parent
//             .findOne(filter)
//             .populate("students_name")
//             .populate("state")
//             .populate("county")
//             .populate("staff")
//             .exec();
//         if (!user) {
//             throw new Error("User not found.");
//         }
//         if (otp && phone) {
//             if (!user.otp_access) {
//                 throw new Error(`Authentication failed. OTP Access is ${user.otp_access}`);
//             }
//         }
//         if (!(bcryptjs.compareSync(password || "", user.password)
//         || (bcryptjs.compareSync(otp || "", user.otp) && user.otp_access))) {
//             throw new Error("Wrong password or otp credentials.");
//         }
//         const query = { _id: user._id };
//         const update = { otp_access: false };
//         await Parent.findOneAndUpdate(query, update, { new: true }).exec();
//         // Delete private attributes
//         user.password = null;
//         user.otp = null;
//         delete user.password;
//         delete user.otp;
//         const payload = {
//             id: user.id,
//             userType: "parent",
//             email,
//             phone,
//             time: new Date(),
//         };
//         token = jwt.sign(payload, JWT.jwtSecret, {
//             expiresIn: "240h", // JWT.tokenExpireTime,
//         });
//     } catch (err) {
//         throw new Error(`Authentication failed ${err.message}`);
//     }
//     return { token, user };
// }
// export async function studentAuthenticate(loginPayload) {
//     // return next();
//     const { email, phone, otp, password } = loginPayload;
//     let user;
//     let token;
//     try {
//         const filter = {};
//         if (phone) {
//             filter.phone = phone;
//         } else {
//             filter.email = email;
//         }
//         user = await Student
//             .findOne(filter)
//             .populate("classe")
//             .populate("hostel")
//             .populate("state")
//             .populate("county")
//             .exec();
//         if (!user) {
//             throw new Error("User not found.");
//         }
//         if (otp && phone) {
//             if (!user.otp_access) {
//                 throw new Error(`Authentication failed. OTP Access is ${user.otp_access}`);
//             }
//         }
//         if (!(bcryptjs.compareSync(password || "", user.password)
//         || (bcryptjs.compareSync(otp || "", user.otp) && user.otp_access))) {
//             throw new Error("Wrong password or otp credentials.");
//         }
//         const query = { _id: user._id };
//         const update = { otp_access: false };
//         await Student.findOneAndUpdate(query, update, { new: true }).exec();
//         // Delete private attributes
//         user.password = null;
//         user.otp = null;
//         delete user.password;
//         delete user.otp;
//         const payload = {
//             id: user.id,
//             userType: "student",
//             email,
//             phone,
//             time: new Date(),
//         };
//         token = jwt.sign(payload, JWT.jwtSecret, {
//             expiresIn: "240h", // JWT.tokenExpireTime,
//         });
//     } catch (err) {
//         throw new Error(`Authentication failed ${err.message}`);
//     }
//     return { token, user };
// }


function _staffAuthenticate() {
  _staffAuthenticate = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(loginPayload) {
    var email, phone, otp, password, user, token, filter, query, update, payload;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // return next();
            email = loginPayload.email, phone = loginPayload.phone, otp = loginPayload.otp, password = loginPayload.password;
            _context.prev = 1;
            filter = {};

            if (phone) {
              filter.phone = phone;
            } else {
              filter.email = email;
            }

            _context.next = 6;
            return _staff["default"].findOne(filter).exec();

          case 6:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            throw new Error("User not found.");

          case 9:
            if (!(otp && phone)) {
              _context.next = 12;
              break;
            }

            if (user.otp_access) {
              _context.next = 12;
              break;
            }

            throw new Error("Authentication failed. OTP Access is ".concat(user.otp_access));

          case 12:
            console.log("User is coming *****", user);

            if (_bcryptjs["default"].compareSync(password || "", user.password) || _bcryptjs["default"].compareSync(otp || "", user.otp) && user.otp_access) {
              _context.next = 15;
              break;
            }

            throw new Error("Wrong password or otp credentials.");

          case 15:
            query = {
              _id: user._id
            };
            update = {
              otp_access: false
            };
            _context.next = 19;
            return _staff["default"].findOneAndUpdate(query, update, {
              "new": true
            }).exec();

          case 19:
            // Delete private attributes
            user.password = null;
            user.otp = null;
            delete user.password;
            delete user.otp;
            payload = {
              id: user.id,
              userType: "staff",
              email: email,
              phone: phone,
              time: new Date()
            };
            token = _jsonwebtoken["default"].sign(payload, _constants.JWT.jwtSecret, {
              expiresIn: "240h" // JWT.tokenExpireTime,

            });
            _context.next = 30;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](1);
            throw new Error("Authentication failed ".concat(_context.t0.message));

          case 30:
            return _context.abrupt("return", {
              token: token,
              user: user
            });

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 27]]);
  }));
  return _staffAuthenticate.apply(this, arguments);
}