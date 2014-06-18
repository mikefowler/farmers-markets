import Router from './router';

class Application {

	constructor () {
		console.debug('✓ Application starting');
		this.$el = $('#main');		
		this.router = new Router();
		Backbone.history.start();
	}

}

$(function () {
	console.debug('✓ The DOM is ready')
	new Application();
});