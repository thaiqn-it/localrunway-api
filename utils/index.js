const bcrypt = require("bcrypt");
const { isMobilePhone } = require("validator");
const { BCRYPT_SALT_ROUND } = require("../constants");

exports.mapErrorArrayExpressValidator = (errorArr) => {
	let errorParams = {};
	for (let x of errorArr) {
		errorParams[x.param] = x.msg;
	}
	return errorParams;
};

exports.isContainSpace = (str) => {
	return str.indexOf(" ") >= 0;
};

exports.hashPassword = (raw) => {
	return bcrypt.hashSync(raw, BCRYPT_SALT_ROUND);
};

exports.comparePassword = (raw, hashed) => {
	return bcrypt.compareSync(raw, hashed);
};

exports.excludeFields = (obj, fields) => {
	const copyObj = { ...obj };
	for (let field of fields) {
		copyObj[field] = undefined;
	}
	return copyObj;
};

exports.excludePassword = (obj, passwordField) => {
	if (!passwordField) passwordField = "password";
	obj.password = undefined;
	return obj;
};

exports.validateVNPhoneNumber = (value) => {
	if (!isMobilePhone(value, "vi-VN")) {
		return Promise.reject(
			"Phone Number should be from VN. Prefix +84, 84, 0 is OK"
		);
	}
	return Promise.resolve();
};
