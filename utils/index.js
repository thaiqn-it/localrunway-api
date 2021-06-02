exports.mapErrorArrayExpressValidator = (errorArr) => {
	return errorArr.map((x) => ({ [x.param]: x.msg }));
};

exports.isContainSpace = (str) => {
	return str.indexOf(" ") >= 0;
};
