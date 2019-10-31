const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

/**
 * @apiDefine UserError
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Thing not found.
 * @apiError 401 master access only.
 */

/**
 * @api {post} /api/stuff Create user
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
router.post('/signup', userCtrl.signup);

/**
 * @api {post} /api/stuff Login user
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
router.post('/login', userCtrl.login);

/**
 * @api {post} /api/stuff Create example
 * @apiName LoginExample
 * @apiGroup Example
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} [email] Email of the example (required)
 * @apiParam {String} [password] Password of the example (required)
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 OK
 * 
 * @apiUse UserError
 */

module.exports = router;