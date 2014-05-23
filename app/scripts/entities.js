App.module('Entities', function (Entities, App, Backbone) {

	var API_ROOT = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc';

	Entities.Market = Backbone.Model.extend({

		url: function () {
			return API_ROOT + '/mktDetail?id=' + this.id;
		},

		// When a Market is included in a collection of search results,
		// it comes as a top-level key. However, when queried directly
		// a Market response comes nested inside of a "marketdetails"
		// key. Thus, return the appropriate response.
		
		parse: function (response) {

			var transformMap = {
				'Address': 'address',
				'GoogleLink': 'map',
				'Products': 'products',
				'Schedule': 'schedule',
				'marketname': 'name'
			};

			response = response.marketdetails || response;

			_.each(transformMap, function (value, key) {
				if (response[key]) {
					response[value] = response[key];
					delete response[key];
				}
			});

			return response;
		},

		// Oddly, the location of a Market is not returned as its own key. It is,
		// however, contained in the provided Google Maps link. In order to pull
		// it out and use it here, we do some simple regex magic and return an
		// array of [latitude, longitude]
		
		location: function () {
			var map, match;

			map = this.get('map');

			if (map) {
				match = map.match(/\?q=([-\d\.]+)%2C%20([-\d\.]+)/);
				
				if (match !== -1) {
					return match.splice(1);
				}
			}

			return null;
		}

	});

	Entities.Search = Backbone.Collection.extend({

		url: API_ROOT + '/zipSearch',

		model: Entities.Market,

		initialize: function () {
			this.listenTo(this, 'add', this.fetchModel);
		},

		parse: function (response) {
			return response.results;
		},

		fetchModel: function (model) {
			model.fetch();
		}

	});

});