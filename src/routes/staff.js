const express = require('express');
const staffCtrl = require('../controllers/staff');

const router = express.Router();

/**
 * @apiDefine UserError
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Thing not found.
 * @apiError 401 master access only.
 */

/**
 * @api {post} /api/staff Create Staff
 * @apiName CreateStaff
 * @apiGroup Staff
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} [surname] Surname of the staff
 * @apiParam {String} [firstname] firstname of the staff
 * @apiParam {String} [middlename] middlename of the staff
 * @apiParam {String} [gender] gender of the staff
 * @apiParam {String} [birth_date] birth_date of the staff
 * @apiParam {String} [phone] phone number of the staff
 * @apiParam {String} [email] Email of the staff
 * @apiParam {String} [password] Password of the staff
 * @apiSuccess {String} email Email of the User
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 OK
 * 
 * @apiUse UserError
 * @apiDescription This holds all record of staff.
 */
router.post('/', staffCtrl.createRecord);

/**
 * @api {post} /api/staff/login Login staff
 * @apiName LoginStaff
 * @apiGroup Staff
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} [email] Email of the staff
 * @apiParam {String} [password] Password of the staff
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 OK
 * 
 * @apiUse UserError
 */
router.post('/login', staffCtrl.login);

/**
 * @api {get} /api/staff Retrieve all records
 * @apiName RetrieveStaff
 * @apiGroup Staff
* @apiExample {curl} Example usage for retieving records:
 *      curl -i api/staff?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of staff
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', staffCtrl.getAll);

/**
 * @api {get} /api/staff?id={recordId} Retrieve all records
 * @apiName RetrieveStaff
 * @apiGroup Staff
* @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/staff?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of staff
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:id', staffCtrl.getRecord);

/**
 * @api {post} /api/staff/{recordId} Update Staff
 * @apiName UpdateStaff
 * @apiGroup Staff
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} [surname] Surname of the staff
 * @apiParam {String} [firstname] firstname of the staff
 * @apiParam {String} [middlename] middlename of the staff
 * @apiParam {String} [gender] gender of the staff
 * @apiParam {String} [birth_date] birth_date of the staff
 * @apiParam {String} [phone] phone number of the staff
 * @apiParam {String} [email] Email of the staff
 * @apiParam {String} [password] Password of the staff
 * @apiSuccess {String} email Email of the User
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 OK
 * 
 * @apiUse UserError
 * @apiDescription This holds all record of staff.
 */
router.put('/:id', staffCtrl.updateRecord);

/**
 * @api {delete} /api/staff/{recordId} Delete Staff
 * @apiName DeleteStaff
 * @apiGroup Staff
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {ObjectId} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Thing not found.
 * @apiError 401 master access only.
 */
router.delete('/:id', staffCtrl.deleteRecord);

module.exports = router;