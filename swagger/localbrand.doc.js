//schema
/**
 * @swagger
 * components:
 *  schemas:
 *    Localbrand:
 *      type: object
 *      required:
 *        - name
 *        - address
 *        - phoneNumber
 *        - description
 *        - username
 *        - password
 *        - logoUrl
 *      properties:
 *        id:
 *          type: string
 *          fommat: uuid
 *          description:  The auto generate id of Localbrand
 *        name:
 *          type: string
 *          description: Name of the localbrand
 *        address:
 *          type: string
 *          description: The address of localbrand
 *        phoneNumber:
 *          type: string
 *          description: The Phone Number of Localbrand
 *        description:
 *          type: string
 *          description: The Description of Localbrand
 *        status:
 *          type: string
 *          enum : ["ACTIVE", "INACTIVE", "REQUEST"]
 *          description: the status of Localbrand
 *        username:
 *          type: string
 *          description: The login username of Localbrand
 *        password:
 *          type: string
 *          description: The password of Localbrand
 *        logoUrl:
 *          type: string
 *          description: The logoUrl of Localbrand
 *      example:
 *         name: 5TW
 *         address: 68/8 Trần Quang Khải, Q3, TP. Hồ Chí Minh
 *         phoneNumber: 0919555222
 *         description: Lorem Ipsum is simply dummy text
 *         username:  cuong
 *         password: 1234
 *         logoUrl: logo-all-about-him-local-brand-viet-nam-streetwear-585x372.jpg (585×372) (localbrand.vn)
 */
//tag
/**
 * @swagger
 * tags:
 *  name: Localbrand
 *  description: The Localbrand Management Apis
 */
//get
/**
 * @swagger
 * /api/localbrands:
 *  get:
 *    summary: Return list of all Localbrand
 *    tags: [Localbrand]
 *    responses:
 *     200:
 *      description: The list of all hashtag
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Localbrand'
 *     404:
 *      description: Not found
 */
//getbyid
/**
 * @swagger
 * /api/localbrands/{id}:
 *   get:
 *    summary: "get localbrand by id"
 *    tags: [Localbrand]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The hashtag's id
 *    responses:
 *     200:
 *      description: the localband
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Localbrand'
 *     404:
 *      description: the localbrand is not found
 */
//post
/**
 * @swagger
 * /api/localbrands:
 *   post:
 *    summary: "insert new localbrand"
 *    tags: [Localbrand]
 *    requestBody:
 *       required: true
 *       content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/Localbrand'
 *    responses:
 *     200:
 *      description: the inserted Localbrand
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Localbrand'
 *     500:
 *      description: bad request
 */
//put
/**
 * @swagger
 * /api/localbrands/{id}:
 *   put:
 *    summary: "update localbrand by id"
 *    tags: [Localbrand]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Localbrand id
 *    requestBody:
 *       required: true
 *       content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/Localbrand'
 *    responses:
 *     200:
 *      description: the updated Localbrand
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Localbrand'
 *     500:
 *      description: bad request
 */
//delete
/**
 * @swagger
 * /api/localbrands/{id}:
 *   delete:
 *    summary: "delete localbrand by id"
 *    tags: [Localbrand]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The localbrand id
 *        description: The hashtag id
 *    responses:
 *     200:
 *      description: delete succses
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Localbrand'
 *     500:
 *      description: bad request
 */
