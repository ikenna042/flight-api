/**
 * @apiDefine UserError
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Thing not found.
 * @apiError 401 master access only.
 */

/**
 * @api {post} /api/stuff Create user
 * @apiVersion 0.1.0
 * @apiName CreateUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} [email] Email of the user (required)
 * @apiParam {String} [password] Password of the user (required)
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 OK
 * 
 * @apiUse UserError
 */

/**
 * @api {post} /api/stuff Create user
 * @apiVersion 0.1.0
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