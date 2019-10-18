// const express = require('express');
// const router = express.Router();

// const userCtrl = require('../controllers/staff');

/**
 * @apiDefine UserError
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Thing not found.
 * @apiError 401 master access only.
 */

/**
 * @api {post} /api/stuff Create user
 * @apiVersion 0.2.0
 * @apiName CreateUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} [email] Email of the user (required)
 * @apiParam {String} [password] Password of the user (required)
 * @apiSuccess {String} email Email of the User
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 OK
 * 
 * @apiUse UserError
 * @apiDescription This holds all record of users.
 */
// router.post('/signup', userCtrl.createRecord);

/**
 * @api {post} /api/stuff Login user
 * @apiVersion 0.2.0
 * @apiName LoginUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} [email] Email of the user (required)
 * @apiParam {String} [password] Password of the user (required)
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 OK
 * 
 * @apiUse UserError
 */
// router.post('/login', userCtrl.login);

/**
 * @api {post} /api/stuff Create example
 * @apiVersion 0.2.0
 * @apiName LoginExample
 * @apiGroup Example
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} email Email of the example (required)
 * @apiParam {String} [password] Password of the example (required)
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 OK
 * 
 * @apiUse UserError
 */

// module.exports = router;

const express = require('express');
const userCtrl = require('../controllers/staff');
// import { checkAuth, isValidStaff } from "../middleware/authorization";
// import { createRecord, login } from "../controllers/staff";

const router = express.Router();

router.post('/', userCtrl.createRecord);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.getAll);
router.put('/:id', userCtrl.updateRecord);
router.get('/:id', userCtrl.getRecord);
router.delete('/:id', userCtrl.deleteRecord);

module.exports = router;