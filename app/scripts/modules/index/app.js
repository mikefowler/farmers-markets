App.module('Index', function (Index, App, Backbone, Marionette) {

	Index.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'': 'index'
		}
	});

	var API = {
		index: function () {
			var search = new App.Entities.Search();
			search.fetch({ data: { zip: 94117 }});
			window.search = search;
		}
	};

	Index.addInitializer(function () {
		console.debug('✓ Starting module "Index"');
		new Index.Router({
			controller: API
		});
	});

});