const express = require("express");
const { orderDetailService } = require("../services/orderdetail.service");
const { productService } = require("../services/product.service");
const { excludeFields } = require("../utils");
const { isMobilePhone } = require("validator");
const { customer_auth } = require("../middlewares/jwt_auth");
const { orderService } = require("../services/order.service");
const { mapErrorArrayExpressValidator } = require("../utils");
const { validationResult } = require("express-validator");
const { restError } = require("../errors/rest");
const { paymentService } = require("../services/payment.service");
const { localBrandService } = require("../services/localbrand.service");
const { ORDER_STATUS } = require("../models/enum");
const { body } = require("express-validator");
const {
	INTERNAL_SERVER_ERROR,
	BAD_REQUEST,
	NOT_FOUND,
} = require("http-status");

const router = express.Router();

const validateVNPhoneNumber = (value) => {
	if (!isMobilePhone(value, "vi-VN")) {
		return Promise.reject(
			"Phone Number should be from VN. Prefix +84, 84, 0 is OK"
		);
	}
	return Promise.resolve();
};

const isBrandExist = async (brandId) => {
	return (await localBrandService.getById(brandId)) !== null;
};

const isPaymentExist = async (paymentId) => {
	return (await paymentService.getById(paymentId)) !== null;
};

router.post(
	"/",
	customer_auth,
	[
		body("brandId")
			.notEmpty()
			.withMessage("Brand should not be empty")
			.bail()
			.custom(isBrandExist)
			.withMessage("Brand should be existed"),
		body("status")
			.notEmpty()
			.isIn(Object.values(ORDER_STATUS))
			.withMessage(`Status should be one of ${Object.values(ORDER_STATUS)}`),
		body("paymentId")
			.notEmpty()
			.withMessage("Payment should not be empty")
			.custom(isPaymentExist)
			.withMessage(`Payment should be existed`),
		body("address")
			.notEmpty()
			.trim()
			.withMessage("Address should not be empty"),
		body("phoneNumber").notEmpty().bail().custom(validateVNPhoneNumber),
		body("recipientName")
			.notEmpty()
			.trim()
			.withMessage("Recipient Name should not be empty"),
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(BAD_REQUEST).json(
				restError.BAD_REQUEST.extra({
					errorParams: mapErrorArrayExpressValidator(errors.array()),
				})
			);
		}
		try {
			const customerId = req.customer.id;
			if (!customerId) throw new Error();
			const data = { ...req.body, customerId };
			const order = await orderService.createOne(data);
			return res.json({ order });
		} catch (err) {
			res
				.status(INTERNAL_SERVER_ERROR)
				.json(restError.INTERNAL_SERVER_ERROR.default());
		}
	}
);

router.get("/:id", customer_auth, async (req, res, next) => {
	const { id } = req.params;
	try {
		const customerId = req.customer.id;
		const order = await orderService.getByIdAndCustomerId(id, customerId);
		if (order === null) throw new Error();
		const brand = await localBrandService.getById(order.brandId);
		const payment = await paymentService.getById(order.paymentId);
		return res.json({
			order: {
				...order,
				localbrand: brand,
				payment: payment,
			},
		});
	} catch (err) {
		return res.status(NOT_FOUND).json(restError.NOT_FOUND.default());
	}
});

router.put(
	"/:id",
	customer_auth,
	[
		body("brandId")
			.notEmpty()
			.withMessage("Brand should not be empty")
			.bail()
			.custom(isBrandExist)
			.withMessage("Brand should be existed"),
		body("status")
			.notEmpty()
			.isIn(Object.values(ORDER_STATUS))
			.withMessage(`Status should be one of ${Object.values(ORDER_STATUS)}`),
		body("paymentId")
			.notEmpty()
			.withMessage("Payment should not be empty")
			.custom(isPaymentExist)
			.withMessage(`Payment should be existed`),
		body("address")
			.notEmpty()
			.trim()
			.withMessage("Address should not be empty"),
		body("phoneNumber").notEmpty().bail().custom(validateVNPhoneNumber),
		body("recipientName")
			.notEmpty()
			.trim()
			.withMessage("Recipient Name should not be empty"),
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(BAD_REQUEST).json(
				restError.BAD_REQUEST.extra({
					errorParams: mapErrorArrayExpressValidator(errors.array()),
				})
			);
		}
		try {
			const { id } = req.params;
			const customerId = req.customer.id;
			if (!customerId) throw new Error();
			const data = { ...req.body, customerId };
			const order = await orderService.updateOne(id, data);
			return res.json({ order });
		} catch (err) {
			res
				.status(INTERNAL_SERVER_ERROR)
				.json(restError.INTERNAL_SERVER_ERROR.default());
		}
	}
);
router.post(
	"/:id/orderdetails",
	[
		body("productId").notEmpty().withMessage("ProductId should not be empty"),
		body("quantity").isInt().withMessage("Quantity should not be empty"),
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(BAD_REQUEST).json(
				restError.BAD_REQUEST.extra({
					errorParams: mapErrorArrayExpressValidator(errors.array()),
				})
			);
		}
		try {
			const { id: orderId } = req.params;
			const order = await orderService.getById(orderId);
			if (order === null) throw new Error();
			const { productId } = req.body;
			const product = await productService.getById(productId);
			if (product === null) throw new Error();
			const unitPrice = product.price;
			const { quantity } = req.body;
			if (quantity > product.quantity) throw new Error();
			const orderDetail = await orderDetailService.createOne({
				orderId,
				productId,
				quantity,
				unitPrice,
			});
			return res.json({
				orderDetail,
			});
		} catch (err) {
			return res
				.status(INTERNAL_SERVER_ERROR)
				.json(restError.INTERNAL_SERVER_ERROR.default());
		}
	}
);
router.get("/:id/orderdetails/:detailId", async (req, res, next) => {
	const { id: orderId, detailId } = req.params;
	try {
		const orderDetail = await orderDetailService.getByIdAndOrderId(
			detailId,
			orderId
		);
		if (orderDetail === null) throw new Error();
		return res.json({
			orderDetail,
		});
	} catch (err) {
		return res
			.status(INTERNAL_SERVER_ERROR)
			.json(restError.INTERNAL_SERVER_ERROR.default());
	}
});
exports.orderRouter = router;
