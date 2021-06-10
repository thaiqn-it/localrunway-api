const { ProductMedia } = require("../models/productmedia.model");

const resetProductMedia = async (productId, media) => {
	await ProductMedia.deleteMany({
		productId,
	});
	await ProductMedia.create(
		media.map((item) => {
			const { mediaUrl, rank } = item;
			return {
				productId,
				mediaUrl,
				rank,
			};
		})
	);
};

exports.productMediaService = { resetProductMedia };
