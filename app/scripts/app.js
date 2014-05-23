(function (global) {

	var App = global.App = new Marionette.Application();

	App.addRegions({
		MainRegion: '#main' 
	});

	App.on('initialize:after', function () {
		console.debug('✓ Starting Backbone.history')
		Backbone.history.start();
	});

	$(function () {
		console.debug('✓ The DOM is ready')
		App.start();
	});

}(window));