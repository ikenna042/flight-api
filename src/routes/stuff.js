const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');


/**
 * @api {post} /api/stuff Create things
 * @apiName CreateThing
 * @apiGroup Thing
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} title Thing title (required)
 * @apiParam {String} imageUrl Thing imageUrl (required)
 * @apiParam {String} userId Thing userId (required)
 * @apiParam {Number} price Thing price (required)
 * @apiSuccess {Object} Thing Thing's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Thing not found.
 * @apiError 401 master access only.
 */
router.post('/', auth, multer, stuffCtrl.createThing);

/**
 * @api {get} /api/stuff?id={recordId} Retrieve one or all records
 * @apiName RetrieveThing
 * @apiGroup Thing
* @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/stuff?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of things in the store
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', auth, stuffCtrl.getAllThings);

/**
 * @api {get} /api/stuff?id={recordId} Retrieve one or all records
 * @apiName RetrieveThing
 * @apiGroup Thing
* @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/stuff?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of things in the store
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:id', auth, stuffCtrl.getOneThing);

/**
 * @api {put} /api/stuff/{recordId} Update things
 * @apiName UpdateThing
 * @apiGroup Thing
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {ObjectId} recordId required record ObjectId
 * @apiParam {String} title Thing title (required)
 * @apiParam {String} imageUrl Thing imageUrl (required)
 * @apiParam {String} userId Thing userId (required)
 * @apiParam {Number} price Thing price (required)
 * @apiSuccess {Object} Thing Thing's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Thing not found.
 * @apiError 401 master access only.
 */
router.put('/:id', auth, multer, stuffCtrl.updateThing);

/**
 * @api {delete} /api/stuff/{recordId} Delete things
 * @apiName DeleteThing
 * @apiGroup Thing
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {ObjectId} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Thing not found.
 * @apiError 401 master access only.
 */
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;