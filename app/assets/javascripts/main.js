(function (App) {

	App.start = function () {
		console.debug('✓ Application starting');
	
		this.$el = $('#main');		
		this.router = new App.Router();

		Backbone.history.start();
	};

	$(function () {
		console.debug('✓ The DOM is ready')
		App.start();
	});

}(window.App = window.App || {}, Backbone));
