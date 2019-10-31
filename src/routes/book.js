const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const bookCtrl = require('../controllers/book');


/**
 * @api {post} /api/book Create booking
 * @apiName CreateBooking
 * @apiGroup Book
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {ObjectId} name Book name (required)
 * @apiParam {String} from Book from (required)
 * @apiParam {String} to Book to (required)
 * @apiParam {String} class Book class (required)
 * @apiParam {Number} price Book price (required)
 * @apiParam {String} payment Book payment
 * @apiSuccess {Object} Book Book's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book not found.
 * @apiError 401 master access only.
 */
router.post('/', auth, bookCtrl.createRecord);

/**
 * @api {get} /api/book Retrieve all records
 * @apiName RetrieveBooking
 * @apiGroup Book
* @apiExample {curl} Example usage for retieving records:
 *      curl -i api/book?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of bookings
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', auth, bookCtrl.getAll);

/**
 * @api {get} /api/book?id={recordId} Retrieve one or all records
 * @apiName RetrieveBookings
 * @apiGroup Book
* @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/book?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of bookings
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:id', auth, bookCtrl.getRecord);

/**
 * @api {put} /api/book/{recordId} Update Book
 * @apiName UpdateBookings
 * @apiGroup Book
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {ObjectId} name Book name (required)
 * @apiParam {String} from Book from (required)
 * @apiParam {String} to Book to (required)
 * @apiParam {String} class Book class (required)
 * @apiParam {Number} price Book price (required)
 * @apiParam {String} payment Book payment
 * @apiSuccess {Object} Book Book's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book not found.
 * @apiError 401 master access only.
 */
router.put('/:id', auth, bookCtrl.updateRecord);

/**
 * @api {delete} /api/book/{recordId} Delete Booking
 * @apiName DeleteBooking
 * @apiGroup Book
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {ObjectId} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Thing not found.
 * @apiError 401 master access only.
 */
router.delete('/:id', auth, bookCtrl.deleteRecord);

module.exports = router;
