const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

function config(app) {
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.engine('html', handlebars({ extname: '.html' }));
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '..', 'views'));
}

module.exports = config;
