const dotenv = require("dotenv");
dotenv.config();

exports.APP_PORT = 3000;
exports.DB_URI = process.env.DB_URI || `mongodb://localhost:27017/localrunway`;
exports.BCRYPT_SALT_ROUND = 10;
exports.JWT_SECRET_KEY = "lcrw99";
