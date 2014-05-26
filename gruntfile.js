module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		watch: {
			livereload: {
				options: { livereload: true },
				files: [
					'app/assets/javascripts/{,**/}*.js'
				]
			}
		}

	});

	grunt.registerTask('default', ['watch']);

};