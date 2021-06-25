const express = require("express");
const multer = require("multer");
const { firebaseBucket } = require("../utils/firebaseAdmin");
const { restError } = require("../errors/rest");
const { INTERNAL_SERVER_ERROR } = require("http-status");

const upload = multer({
	storage: multer.memoryStorage(),
});
const router = express.Router();
router.use(express.urlencoded({ extended: false }));

router.post("/upload", upload.single("file"), async (req, res, next) => {
	try {
		if (!req.file) throw new Error();
		const originalFilename = req.file.originalname;
		const blob = firebaseBucket.file(originalFilename);
		const blobWriter = blob.createWriteStream({
			metadata: {
				contentType: req.file.mimetype,
			},
		});

		blobWriter.on("error", (err) => {
			console.log(err);
			return res
				.status(INTERNAL_SERVER_ERROR)
				.send(restError.INTERNAL_SERVER_ERROR.default());
		});

		blobWriter.on("finish", () => {
			blob
				.getSignedUrl({
					action: "read",
					expires: "03-09-2491",
				})
				.then((signUrls) => {
					const publicUrl = signUrls[0];
					res.send({
						fileName: originalFilename,
						publicUrl,
					});
				});
		});

		blobWriter.end(req.file.buffer);
	} catch (err) {
		console.log(err);
		return res
			.status(INTERNAL_SERVER_ERROR)
			.send(restError.INTERNAL_SERVER_ERROR.default());
	}
});

module.exports = { mediaRouter: router };
