// Modified from the advice at http://24ways.org/2013/grunt-is-not-weird-and-hard/

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		haml: {
			dist: {
				files: {
					'_render/index.html': [
						'index.haml'
					]
				}
			}
		},

		less: {
			dev: {
				files: {
					"_render/css/main.css": "css/main.less",
				}
			}
		},

		autoprefixer: {
			options: {
				// Task-specific options go here.
				browsers: ['last 2 version', 'ie 9']
			},
			your_target: {
				src: '_render/css/main.css',
				dest: '_render/css/main.css'
			},
		},

		concat: {
			dist: {
				src: [
					'js/*.js', // All JS in the libs folder
				],
				dest: '_render/js/main.js',
			}
		},

		uglify: {
			build: {
				src: '_render/js/main.js',
				dest: '_render/js/main.js',
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: '_render/img/'
				}]
			}
		},

		watch: {
			scripts: {
				files: ['*.haml','*.less','*.js'],
				tasks: ['default'],
				options: {
					spawn: false,
				},
			}
		},

		// copy: {
		// 	dist: {
		// 		files: {
		// 			'_render/rendered.html'      : '_render/source.html'
		// 		}
		// 	}
		// },

		// replace: {
		// 	name_here: {
		// 		src: 'needle.html',
		// 		overwrite: true,
		// 		replacements: [{
		// 			from: '{{needle}}',
		// 			to: '{{different_needle}}',
		// 		}],
		// 	}
		// },


	});

	// Loading up the tasks from above
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-haml');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-text-replace');

	// 	Run a subset of the tasks above as default. Some tasks don't need to be rerun all the time.
	//	This also watches for changes.
	grunt.registerTask('default', ['haml', 'less', 'autoprefixer', 'concat', 'watch']);

	// When we're done.
	grunt.registerTask('export', ['haml', 'less', 'autoprefixer', 'concat', 'uglify', 'imagemin']);









};