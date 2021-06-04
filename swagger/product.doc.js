/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *     type: object
 *     required:
 *       - brandId
 *       - categoryId
 *       - name
 *       - description
 *       - price
 *       - color
 *       - quantity
 *       - parentId
 *       - type
 *     properties:
 *       id:
 *         type: string
 *         fommat: uuid
 *         description:  The auto generate id of Localbrand
 *       brandId:
 *         type: string
 *         fommat: uuid
 *         description: The Foreign key from Localbrand
 *       categoryId:
 *         type: string
 *         fommat: uuid
 *         description: The Foreign key from Catgory
 *       name:
 *         type: string
 *         description: Name of the product
 *       description:
 *         type: string
 *         description: The description of product
 *       status:
 *         type: string
 *         enum : ["ACTIVE", "INACTIVE"]
 *         description: the status of Localbrand
 *       price:
 *         type: number
 *         description: The price of product
 *       color:
 *         type: string
 *         description: The color of the product
 *       quantiy:
 *         type: number
 *         description: The quantity of product
 *       parentId:
 *         type: string
 *         fommat: uuid
 *         description: the parents's product id of this product refer to
 *       size:
 *         type: string
 *         description: the size of the product
 *       type:
 *         type: string
 *         enum:  [PRODUCT_TYPE.GENERAL_PRODUCT, PRODUCT_TYPE.DETAIL_PRODUCT]
 *         description: the type of the product
 */
//tag
/**
 * @swagger
 * tags:
 *  name: Product
 *  description: The Localbrand Management Apis
 */
//getbyid
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *    summary: "get product by id"
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product's id
 *    responses:
 *     200:
 *      description: the product
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *     404:
 *      description: the Product is not found
 */
//getHashtagsByProductId
/**
 * @swagger
 * /api/products/{id}/hashtags:
 *   get:
 *    summary: "get hashtags by productId"
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product's id
 *    responses:
 *     200:
 *      description: The list of all Product
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Product'
 *     500:
 *      description: the Product is not found
 */
//get
/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Return list of products
 *    tags: [Product]
 *    responses:
 *     200:
 *      description: The list of all products
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Product'
 */
