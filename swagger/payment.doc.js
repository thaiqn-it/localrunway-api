<<<<<<< HEAD
=======
//schema
>>>>>>> 7c802e9 (Adding hashtag swagger)
/**
 * @swagger
 * components:
 *  schemas:
 *    Payment:
<<<<<<< HEAD
 *      type: Object
 *      required: true
 *
 */
=======
 *      type: string
 *      required:
 *        - paymentMethod
 *      properties:
 *        id:
 *          type: string
 *          description:  The auto generate id of payment
 *        paymentMethod:
 *          type: string
 *          description: Name of the payment
 *      example:
 *        name: COD
 */
//tag
/**
 * @swagger
 * tags:
 *  name: Payment
 *  description: The Payment Management Apis
 */
//get
/**
 * @swagger
 * /api/payments:
 *  get:
 *    summary: Return list of all payments
 *    tags: [payments]
 *    responses:
 *     200:
 *      description: The list of all payments
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Payment'
 */
>>>>>>> 7c802e9 (Adding hashtag swagger)
