module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		watch: {
			templates: {
				files: ['app/templates/{,**/}*.hbs'],
				tasks: ['handlebars']
			},
			livereload: {
				options: { livereload: true },
				files: [
					'app/scripts/**/*.js',
					'.tmp/scripts/**/*.js'
				]
			}
		},

		connect: {
			server: {
				options: {
					port: 4500,
					base: ['.tmp', 'app']
				}
			}
		},

		handlebars: {
			dist: {
				options: {
					namespace: 'App.Templates',
					processName: function (file) {
						return file.replace('app/templates/', '').replace('.hbs', '');
					}
				},
				files: {
					'.tmp/scripts/templates.js': ['app/templates/{,**/}*.hbs']
				}
			}
		}

	});

	grunt.registerTask('default', ['handlebars', 'connect', 'watch']);

};