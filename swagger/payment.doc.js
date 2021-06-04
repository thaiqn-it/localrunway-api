//schema
/**
 * @swagger
 * components:
 *  schemas:
 *    Payment:
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
 *  description: The Localbrand Management Apis
 */
//get
/**
 * @swagger
 * /api/payments:
 *  get:
 *    summary: Return list of all payments
 *    tags: [Payment]
 *    responses:
 *     200:
 *      description: The list of all payments
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Payment'
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
 *  description: The Localbrand Management Apis
 */
//get
/**
 * @swagger
 * /api/payments:
 *  get:
 *    summary: Return list of all payments
 *    tags: [Payment]
 *    responses:
 *     200:
 *      description: The list of all payments
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Payment'
 *      type: Object
 *      required: true
 *
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
 *    tags: [Payment]
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
