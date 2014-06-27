module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		nodemon: {
			dev: {
				script: 'server.js'
			}
		},

		watch: {
			livereload: {
				options: { livereload: true },
				files: [
					'public/**/*.css',
					'public/**/*.js'
				]
			},
			sass: {
				files: ['app/assets/stylesheets/{,**/}*.scss'],
				tasks: ['sass']
			}
		},

		sass: {
			dist: {
				files: {
					'public/css/main.css': 'app/assets/stylesheets/main.scss'
				}
			}
		}

	});

	grunt.registerTask('test', []);
	grunt.registerTask('serve', ['nodemon']);
	grunt.registerTask('build', ['sass']);
	grunt.registerTask('default', ['build', 'serve', 'watch']);

};