//schema
/**
 * @swagger
 * components:
 *  schemas:
 *    Customer:
 *      type: object
 *      required:
 *        - phoneNumber
 *        - email
 *        - password
 *        - name
 *        - status
 *        - gender
 *        - height
 *        - weight
 *      properties:
 *        id:
 *          type: string
 *          fommat: uuid
 *          description: the auto generated id of customer
 *        phoneNumber:
 *          type: string
 *          description:  The customer Phone Number
 *        email:
 *          type: string
 *          description: Email of the customer
 *        password:
 *          type: string
 *          description: Password to login of customer
 *        token:
 *          type: string
 *          description: Token of 3 party
 *        name:
 *          type: string
 *          description: The name of customer
 *        status:
 *          type: string
 *          emum: ["ACTIVE", "INACTIVE"]
 *          description: The status of customer's account
 *        hobby:
 *          type: string
 *          description: the hobby of customer
 *        job:
 *          type: string
 *          description: the job of customer
 *        gender:
 *          type: string
 *          enum: ["MALE", "FEMALE", "OTHER"]
 *          description: the gender of customer
 *        height:
 *          type: number
 *          description: The customer's height
 *        weight:
 *          type: number
 *          description: The customer's weight
 *        waist:
 *          type: number
 *          description: The customer's waist number
 *        hip:
 *          type: number
 *          description: The customer's waist number
 *        bust:
 *          type: number
 *          description: The customer's bust number
 *
 */
//tag
/**
 * @swagger
 * tags:
 *  name: Customer
 *  description: The Customer Management Apis
 */
//get
/**
 * @swagger
 * /api/custoemers/me:
 *  get:
 *    summary: Return the customer's infomation
 *    tags: [Customer]
 *    responses:
 *     200:
 *      description: the customer's infomation
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Customer'
 *
 */
//post
/**
 * @swagger
 * /api/custoemers/login:
 *   post:
 *    summary: "Login"
 *    tags: [Customer]
 *    requestBody:
 *       required: true
 *       content:
 *        application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  password:
 *                      type: string
 *                  phoneNumber:
 *                      type: string
 *    responses:
 *     200:
 *      description: the JWT auth token
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                  type: string
 *     500:
 *      description: bad request
 */
