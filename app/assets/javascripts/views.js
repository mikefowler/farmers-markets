import { Market, Markets } from './entities';

class SearchView extends Backbone.View {

	constructor (options) {
		this.template = JST['search'];
		this.className = 'search';
		this.markets = new Markets();
		this.events = {
			'keyup input': 'search'
		};
		super(options);
	}

	render () {
		this.$el.html(this.template());
		
		this.ui = {
			input: this.$('.js-input'),
			results: this.$('.js-results')
		};

		this.resultsView = new SearchResultsView({
			collection: this.markets
		});

		this.ui.results.html(this.resultsView.render().$el);

		return this;
	}

	search () {
		var self = this;
		var promise;
		var zip = self.ui.input.val();
		
		if (zip.length !== 5) {
			self.resultsView.$el.css({ opacity: 0.5 });
			return;
		}

		promise = self.markets.fetch({
			data: {
				zip: zip
			},
			reset: true
		});

		promise.then(function () {
			self.resultsView.$el.css({ opacity: 1 }).show();
		});
	}

}

class SearchResultView extends Backbone.View {

	constructor (options) {
		super(options);

		this.tagName = 'li';
		this.className = 'search-result';
		this.template = JST['search-result'];
	}

	render () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

}

class SearchResultsView extends Backbone.View {

	constructor (options) {
		super(options);

		this.tagName = 'ul';
		this.className = 'search-results';
		this.itemView = SearchResultView;
		this.listenTo(this.collection, 'reset', this.render);
	}

	addItem (model) {
		var itemView = new this.itemView({ model: model });
		this.$el.append(itemView.render().$el);
	}

	render () {
		this.$el.empty();
		this.collection.forEach(this.addItem, this);
		return this;
	}

}

export { SearchView, SearchResultView, SearchResultsView }