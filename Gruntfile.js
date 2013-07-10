var path = require('path');

var stylesheetsDir = 'public/stylesheets';
var javascriptDir = 'public/javascript';

module.exports = function(grunt) {
	//Project configuration
	grunt.initConfig({	
		pkg: grunt.file.readJSON('package.json'),
		
		bgShell: {
			runNode: {
				cmd: 'node app.js',
				bg: true
			}
		},

		stylus: {
			compile: {
				options: {
					paths: [stylesheetsDir],
					'include css': true
				},
				files: {
					'public/app/css/app.min.css': stylesheetsDir + '/index.styl' 
				}
			}
		},

		watch: {
			stylesheets: {
				files: [stylesheetsDir + '/**/*.styl', stylesheetsDir + '/**/*.css'],
				tasks: ['stylus'],
				options: {
					interrupt: true
				}
			}
		}
	});

	//Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-bg-shell');

	//Compile Javascript Client-Side and Processing Stylus to CSS
	grunt.registerTask('compile', ['stylus']);

	//Run the server and watch for file changes
	grunt.registerTask('server', ['bgShell:runNode', 'compile', 'watch'])

	//Default task(s)
	grunt.registerTask('default', ['compile']);
};