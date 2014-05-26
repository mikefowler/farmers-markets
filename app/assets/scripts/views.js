(function (App, Backbone) {

	App.SearchView = Backbone.View.extend({

		template: App.Templates['search'],

		className: 'search',

		initialize: function () {
			this.markets = new App.Markets();
		},

		events: {
			'keyup input': 'search'
		},

		render: function () {
			this.$el.html(this.template());
			
			this.ui = {
				input: this.$('.js-input'),
				results: this.$('.js-results')
			};

			return this;
		},

		search: function () {
			var zip = this.ui.input.val();
				
			if (zip.length !== 5) {
				return;
			}

			if (this.resultsView) {
				this.resultsView.remove();
			}

			this.resultsView = new App.SearchResultsView({
				collection: this.markets
			});

			this.ui.results.html(this.resultsView.$el);

			this.markets.fetch({
				data: {
					zip: zip
				}
			});
		}

	});

	App.SearchResultView = Backbone.View.extend({

		tagName: 'li',

		className: 'search-result',

		template: App.Templates['search-result'],

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

	});

	App.SearchResultsView = Backbone.View.extend({

		tagName: 'ul',

		className: 'search-results',

		itemView: App.SearchResultView,

		initialize: function () {
			this.listenTo(this.collection, 'add', this.addItem);
		},

		addItem: function (model) {
			console.log('adding model', model);
			var itemView = new this.itemView({ model: model });
			this.$el.append(itemView.render().$el);
		}

	});

}(window.App = window.App || {}, Backbone));