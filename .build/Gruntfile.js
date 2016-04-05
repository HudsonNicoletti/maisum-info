module.exports = function(grunt){
    grunt.initConfig({

        sass: {
            dist: {
                options: {
                    style: 'compressed'   // nested, compact, compressed, expanded.
                },
                files: {
                    '../assets/styles/main.css': 'styles/main.sass',
                }
            }
        },

        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    "../index.html":        "pages/index.jade",
                }
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: '../assets/styles/*.css'
            }
        },

        rucksack: {
            compile: {
                files: {
                    '../assets/styles/main.css': '../assets/styles/main.css'
                }
            }
        },

        imagemin: {
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: '../assets/images/',      // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: '../assets/images/'      // Destination path prefix
                }]
            }
        },

        uglify: {
            my_target: {
                files: {
                    '../assets/scripts/functions.min.js': ['scripts/functions.js']
                }
            }
        },

        watch: {
            sass:
            {
                files: ['styles/**/*.sass'],
                tasks: ['sass','rucksack','postcss:dist'],
                options: {
                  livereload: true,
                }
            },
            jade:
            {
                files: ['pages/*.jade'],
                tasks: ['jade'],
                options: {
                  livereload: true,
                }
            },
            js:
            {
                files: ['scripts/*.js'],
                tasks: ['uglify'],
                options: {
                  livereload: true,
                }
            },
            images:
            {
                files: ['../assets/images/**/*'],
                tasks: ['imagemin'],
                options: {
                  livereload: true,
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-rucksack');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.registerTask('default', ['watch'])
}
