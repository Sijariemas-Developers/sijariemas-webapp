module.exports = function(grunt) {

    /*
     * https://github.com/gruntjs/grunt/wiki/Configuring-tasks
     */
    grunt.initConfig({
        dirs: {
            handlebars: '_attachments/templates'
        },
        watch: {
            handlebars: {
                files: ['<%= handlebars.compile.src %>'],
                tasks: ['handlebars:compile']
            },
            less: {
                files: ['_attachments/bower_components/bootstrap/less/*.less'],
                tasks: ['less']
            },
            coffee: {
              files: ['_attachments/**/*.coffee'],
              tasks: ['coffee']
            }
        },
        handlebars: {
            compile: {
                options: {
                    amd: false
                },
                src: ["_attachments/templates/**/*.handlebars"],
                dest: "_attachments/templates/precompiled.handlebars.js"
            }
        },
        less: {
            development: {
                options: {
                    paths: ["_attachments/bower_components/bootstrap/less", "_attachments/bower_components/bootstrap/dist/css"],
                    cleancss: true,
                    yuicompress: true,
                    compress: true,
                    sourceMap: true,
                    sourceMapFilename: "_attachments/bower_components/bootstrap/dist/css/bootstrap.css.map",
                    sourceMapBasepath: "_attachments/bower_components/bootstrap/dist/css/"
                },
                files: {
                    "_attachments/bower_components/bootstrap/dist/css/bootstrap.css": "_attachments/bower_components/bootstrap/less/bootstrap.less"
                }
            }
        },
        coffee: {
          compile: {
            options: {
              bare: true
            },
            expand: true,
            flatten: false,
            cwd: "_attachments",
            src: ["**/*.coffee"],
            dest: '_attachments',
            ext: ".js"
            //files: {
            //  '_attachments/**/*.js': '_attachments/**/*.coffee' // 1:1 compile,
            //}
          }
        }
    });

    // Requires the needed plugin
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.registerTask('default',['less']);

//    grunt.registerTask('less', function (target) {
//
//        grunt.task.run([
//            'less'
//        ]);
//    });
};