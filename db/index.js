const mongoose = require("mongoose");
const { DB_URI } = require("../constants");

const mongooseConnection = mongoose.connect(DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

module.exports = { mongooseConnection };
