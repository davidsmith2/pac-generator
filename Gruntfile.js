'use strict';

var glob = require('glob');
var loadGruntTasks = require('load-grunt-tasks');

const loadConfig = (path) => {
    let object = {};
    let key;
    glob.sync('*', {cwd: path}).forEach((option) => {
        key = option.replace(/\.js$/,'');
        object[key] = require(path + option);
    });
    return object;
};

module.exports = (grunt) => {
    let config;
    loadGruntTasks(grunt, {
        scope: 'devDependencies'
    });
    config = {
        pkg: grunt.file.readJSON('package.json')
    };
    grunt.util._.extend(config, loadConfig('./tasks/options/'));
    grunt.initConfig(config);
    grunt.loadTasks('tasks');
};
