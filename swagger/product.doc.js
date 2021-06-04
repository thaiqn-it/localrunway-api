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
