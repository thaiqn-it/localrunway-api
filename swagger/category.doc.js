//shema
/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          description:  The auto generate id of Category
 *        name:
 *          type: string
 *          description: Name of the category
 *      example:
 *        name: ao dai
 */
//tags
/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: The Category Management Apis
 */
//get
/**
 * @swagger
 * /api/categories:
 *  get:
 *    summary: Return list of all category
 *    tags: [Categories]
 *    responses:
 *     200:
 *      description: The list of all category
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Category'
 */
//post
/**
 * @swagger
 * /api/categories:
 *   post:
 *    summary: "post category"
 *    tags: [Categories]
 *    requestBody:
 *       required: true
 *       content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *    responses:
 *     200:
 *      description: the inserted category
 *      content:
 *        application/json:
 *          schema:
 *            ref: '#/components/schemas/Category'
 *     500:
 *      description: bad request
 */
//put
/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *    summary: "update category"
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id
 *    requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/Category'
 *    responses:
 *     200:
 *      description: the updated category
 *      content:
 *        application/json:
 *          schema:
 *            ref: '#/components/schemas/Category'
 *     500:
 *      description: bad request
 */
//getbyid
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *    summary: "get category by id"
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id
 *    responses:
 *     200:
 *      description: the category is found
 *      content:
 *        application/json:
 *          schema:
 *            ref: '#/components/schemas/Category'
 *     404:
 *      description: the category is not found
 */
//delete
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *    summary: "delete the category id"
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id
 *    responses:
 *     200:
 *      description: the category is found and deleted
 *      content:
 *        application/json:
 *          schema:
 *            ref: '#/components/schemas/Category'
 *     500:
 *      description: the category is not found
 */
