// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var _ = require('underscore');
var async = require('async');
var request = require('request');

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

var API_HOST = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc';

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

var Search = module.exports = {

	search: function (term, callback) {
		var getMarkets = _.partial(marketsQuery, term);

		async.waterfall([
			getMarkets,
			getMarketDetails,
			mapResults
		], function (err, results) {
			if (err) { return callback(err); }
			callback(null, results);
		});
	}

};

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

function marketsQuery (term, next) {
	request({
		url: API_HOST + '/zipSearch?zip=' + term,
		json: true
	}, function (err, response, body) {
		if (err) { return next(err); }
		next(null, body.results);
	});
}

function getMarketDetails (results, next) {
	async.map(results, function (item, callback) {
		request({
			url: API_HOST + '/mktDetail?id=' + item.id,
			json: true
		}, function (err, response, body) {
			if (err) { return next(err); }
			item = _.extend(item, body.marketdetails);
			callback(null, item);
		});
	}, function (err, results) {
		if (err) { return next(err); }
		 next(null, results);
	});
}

function mapResults (results, next) {
	
	// A simple map of to transform an object's keys. For each (key, value)
	// here, it looks for a key named "key" in the object we're transforming
	// and renames it to "value".

	var resultMap = {
		'marketname': 'name',
		'Address': 'address',
		'GoogleLink': 'map',
		'Products': 'products',
		'Schedule': 'schedule'
	};

	_.map(results, function (item) {
		
		var match;

		// Cast the ID to a number, rather than a string
		if (item.id) {
			item.id = parseInt(item.id);
		}

		// Normalize the item's keys for consistency and sanity
		_.each(resultMap, function (value, key) {
			if (item[key]) {
				item[value] = item[key].trim();
				delete item[key];
			}
			return item;
		});

		// Extract the latitude & longitude from the Google Maps link
		if (item.map) {
			match = item.map.match(/\?q=([-\d\.]+)%2C%20([-\d\.]+)/);
			if (match !== -1) {
				match = match.splice(1);
				item.location = [];
				item.location.push(parseFloat(match[0]));
				item.location.push(parseFloat(match[1]));
			}
		}

		// Extract the distance to the item from the name. Why this is
		// returned as part of the name in the first place… god knows.
		if (item.name) {
			match = item.name.match(/^([\d\.]+)(.+)$/);
			if (match !== -1) {
				match = match.splice(1);
				item.distance = parseFloat(match[0]);
				item.name = match[1].trim();
			}
		}

		// For lists of products, convert the semicolon-delimited list into
		// an array for convenience sake, and trim excess spaces for good measure
		if (item.products) {
			item.products = item.products.split(';');
			item.products = _.map(item.products, function (item) { return item.trim(); });
		}

	});

	// Pass the transformed object of results back to our
	next(null, results);
}