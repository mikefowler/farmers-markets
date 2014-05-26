// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var cache = require('../../lib/cache');
var USDAService = require('../services/usda');

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

function index (req, res, next) {
	var zip = req.query.zip;

	if (!zip || zip.length !== 5) {
		return next(Error.BadRequest);
	}

	var cacheKey = 'search:' + zip;

	cache.get(cacheKey, function (err, data) {
  	if (err) { return next(new Error.Internal); }
  	if (data) { return res.json(data); }

  	USDAService.search(zip, function (err, results) {
  		console.log('error from usda', err);
			if (err) { return next(err); }
			cache.set(cacheKey, 86400, results); // 60 * 60 * 24 = 86400 seconds
			return res.json(results);
		});
  });
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

exports.index = index;
