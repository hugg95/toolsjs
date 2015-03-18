module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    uglify: {
        options: {
            mangle: true,
            banner: '/*\n <%= pkg.name %> v<%= pkg.version %>\n Author: <%= pkg.author %> <%= pkg.homepage %>\n License: MIT \n*/\n'
        },
    dist: {
        files: {
            'dist/tools.min.js': ['src/tools.js']
        }
    }
    }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

};
