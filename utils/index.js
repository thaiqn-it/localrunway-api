const bcrypt = require("bcrypt");
const { BCRYPT_SALT_ROUND } = require("../constants");

exports.mapErrorArrayExpressValidator = (errorArr) => {
	return errorArr.map((x) => ({ [x.param]: x.msg }));
};

exports.isContainSpace = (str) => {
	return str.indexOf(" ") >= 0;
};

exports.hashPassword = (raw) => {
	return bcrypt.hashSync(raw, BCRYPT_SALT_ROUND);
};

exports.excludePassword = (obj, passwordField) => {
	if (!passwordField) passwordField = "password";
	obj.password = undefined;
	return obj;
};
