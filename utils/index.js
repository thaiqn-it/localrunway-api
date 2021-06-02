exports.mapErrorArrayExpressValidator = (errorArr) => {
  return errorArr.map((x) => ({ [x.param]: x.msg }));
};
