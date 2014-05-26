(function (App, Backbone) {

	App.Router = Backbone.Router.extend({

		routes: {
			'': 'index'
		},

		index: function () {
			console.debug('@ index');

			var view = new App.SearchView();
			App.$el.html(view.render().$el);
		}

	});

}(window.App = window.App || {}, Backbone));