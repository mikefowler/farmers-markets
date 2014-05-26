(function (App, Backbone) {

	App.Market = Backbone.Model.extend({

	});

	App.Markets = Backbone.Collection.extend({

		url: 'api/search',

		model: App.Market

	});

}(window.App = window.App || {}, Backbone));