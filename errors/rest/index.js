function defaultError(msg) {
  this.error = {
    error: msg,
  };
}

defaultError.prototype.extra = function (items) {
  return {
    ...this.error,
    ...items,
  };
};

defaultError.prototype.default = function () {
  return this.error;
};

const BAD_REQUEST = new defaultError("Bad Request!");
const INTERNAL_SERVER_ERROR = new defaultError("Server Error!");

exports.restError = { BAD_REQUEST, INTERNAL_SERVER_ERROR };
