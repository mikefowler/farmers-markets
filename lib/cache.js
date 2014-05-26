// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var redis = require('../db/redis').client();

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

function set (key, seconds, data) {
	redis.setex(key, seconds, JSON.stringify(data), function (err) {
  	if (err) {
  		console.log(err);
  	}
  });
}

function get (key, callback) {
	redis.get(key, function (err, data) {
  	if (err) { return callback(err); }
    data = JSON.parse(data);
    callback(null, data);
  });
}

// ----------------------------------------------------------------------------
// Exports
// ----------------------------------------------------------------------------

exports.set = set;
exports.get = get;