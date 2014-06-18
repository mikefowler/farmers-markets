class Market extends Backbone.Model {

}

class Markets extends Backbone.Collection {

	constructor (options) {
		super(options);
		
		this.url = 'api/search';
		this.model = Market;
		this.comparator = 'distance';
	}

}

export { Market, Markets }