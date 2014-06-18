import { SearchView } from './views';

class Router extends Backbone.Router {

	constructor (options) {
		this.routes = {
			'': 'index'
		};
		super(options);
	}
		
	index () {
		console.debug('@ index');
		var view = new SearchView();
		$('#main').html(view.render().$el);
	}

}

export default Router;