//schema
/**
 * @swagger
 * components:
 *  schemas:
 *    Hashtag:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          description:  The auto generate id of Hashtag
 *        name:
 *          type: string
 *          description: Name of the hashtag
 *      example:
 *        name: thoi thuong
 */
//tag
/**
 * @swagger
 * tags:
 *  name: Hashtag
 *  description: The Hashtag Management Apis
 */
//get
/**
 * @swagger
 * /api/hashtags:
 *  get:
 *    summary: Return list of all hashtag
 *    tags: [Hashtag]
 *    responses:
 *     200:
 *      description: The list of all hashtag
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Hashtag'
 */
//getbyid
/**
 * @swagger
 * /api/hashtags/{id}:
 *   get:
 *    summary: "get hashtag by id"
 *    tags: [Hashtag]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The hashtag's id
 *    responses:
 *     200:
 *      description: the hashtag
 *      content:
 *        application/json:
 *          schema:
 *            ref: '#/components/schemas/Hashtag'
 *     404:
 *      description: the hashtag is not found
 */
//post
/**
 * @swagger
 * /api/hashtags:
 *   post:
 *    summary: "insert hashtag"
 *    tags: [Hashtag]
 *    requestBody:
 *       required: true
 *       content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hashtag'
 *    responses:
 *     200:
 *      description: the inserted hashtag
 *      content:
 *        application/json:
 *          schema:
 *            ref: '#/components/schemas/Hashtag'
 *     500:
 *      description: bad request
 */
//put
/**
 * @swagger
 * /api/hashtags/{id}:
 *   put:
 *    summary: "update hashtag by id"
 *    tags: [Hashtag]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The hashtag id
 *    requestBody:
 *       required: true
 *       content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hashtag'
 *    responses:
 *     200:
 *      description: the updated Hashtag
 *      content:
 *        application/json:
 *          schema:
 *            ref: '#/components/schemas/Hashtag'
 *     500:
 *      description: bad request
 */
//delete
/**
 * @swagger
 * /api/hashtags/{id}:
 *   delete:
 *    summary: "delete hashtag by id"
 *    tags: [Hashtag]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The hashtag id
 *    responses:
 *     200:
 *      description: delete succses
 *      content:
 *        application/json:
 *          schema:
 *            ref: '#/components/schemas/Hashtag'
 *     500:
 *      description: bad request
 */
