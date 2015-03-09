module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    uglify: {
        options: {
            mangle: true
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
