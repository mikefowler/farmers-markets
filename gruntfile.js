module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		watch: {
			livereload: {
				options: { livereload: true },
				files: [
					'public/assets/*.css',
					'public/assets/*.js'
				]
			},
			scripts: {
				files: ['app/assets/javascripts/{,**/}*.js'],
				tasks: ['traceur']
			},
			sass: {
				files: ['app/assets/stylesheets/{,**/}*.scss'],
				tasks: ['sass']
			},
			templates: {
				files: ['app/assets/templates/{,**/}*.hbs'],
				tasks: ['handlebars']
			}
		},

		traceur: {
			dist: {
				options: {
					debug: true
				},
				files: {
					'public/assets/application.js': ['app/assets/javascripts/application.js']
				}
			}
		},

		sass: {
			dist: {
				files: {
					'public/assets/main.css': 'app/assets/stylesheets/main.scss'
				}
			}
		},

		handlebars: {
			dist: {
				options: {
					namespace: 'JST',
					processName: function (path) {
						return path
              .replace('app/assets/templates/', '')
              .replace(/.hbs$/, '');
					}
				},
				files: {
					'public/assets/templates.js': 'app/assets/templates/*.hbs'
				}
			}
		},

		uglify: {
			vendor: {
				files: {
					'public/assets/vendor.js': [
						'app/bower_components/jquery/dist/jquery.js',
						'app/bower_components/underscore/underscore.js',
						'app/bower_components/backbone/backbone.js',
						'app/bower_components/handlebars/handlebars.runtime.js',
						'app/bower_components/traceur-runtime/traceur-runtime.js'
					]
				}
			}
		}

	});

	grunt.registerTask('test', []);
	grunt.registerTask('build', ['uglify', 'handlebars', 'sass', 'traceur']);
	grunt.registerTask('default', ['build', 'watch']);

};