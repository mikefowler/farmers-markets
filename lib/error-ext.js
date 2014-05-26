var errorTypes = [
  // 4xx
  {name: 'BadRequest', status: 400},
  {name: 'Unauthorized', status: 401},
  {name: 'Validation', status: 403},
  {name: 'NotFound', status: 404},
  {name: 'Conflict', status: 409},

  // 5xx
  {name: 'Internal', status: 500},
  {name: 'NotImplemented', status: 502}
];


errorTypes.forEach(function (type) {
  Error[type.name] = function (message) {
    var error = new Error(message || (type.name + ' (' + type.status + ')'));
    error.code = type.status;

    // Capture the callee's stack trace instead of this functions.
    Error.captureStackTrace(error, arguments.callee);

    return error;
  };
});