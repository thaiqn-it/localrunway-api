const { localBrandService } = require("./localbrand.service");
const { Customer } = require("../models/customer.model");
const { Expo } = require("expo-server-sdk");

let expo = new Expo();

const getOneByPhoneNumber = async (phoneNumber) => {
	return await Customer.findOne({ phoneNumber });
};

const getOne = async ({ ...data }) => {
	return await Customer.findOne(data);
};

const createOne = async ({ firstBoughtBrandIds, ...data }) => {
	if (Array.isArray(firstBoughtBrandIds)) {
		let firstBoughtBrands = "";
		for (let id of firstBoughtBrandIds) {
			const localBrand = await localBrandService.getOne({
				_id: id,
			});
			firstBoughtBrands += localBrand.name + " ";
		}
		data.firstBoughtBrands = firstBoughtBrands;
	}
	return await new Customer(data).save();
};

const updateOne = async (id, { ...data }) => {
	return await Customer.findByIdAndUpdate(id, data, { new: true });
};

const sendPushNotification = async (pushToken, messages) => {
	const sendChunks = async (chunks) => {
		const tickets = [];
		// Send the chunks to the Expo push notification service. There are
		// different strategies you could use. A simple one is to send one chunk at a
		// time, which nicely spreads the load out over time:
		for (let chunk of chunks) {
			try {
				let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
				tickets.push(...ticketChunk);
			} catch (error) {
				console.error(error);
			}
		}
		return tickets;
	};

	if (!Expo.isExpoPushToken(pushToken)) {
		throw new Error();
	}
	messages = messages.map((message) => ({
		...message,
		to: pushToken,
		sound: "default",
	}));
	let chunks = expo.chunkPushNotifications(messages);
	sendChunks(chunks).then((tickets) => {
		// Use latter
	});
};

exports.customerService = {
	getOneByPhoneNumber,
	getOne,
	createOne,
	updateOne,
	sendPushNotification,
};
