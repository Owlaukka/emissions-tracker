const express = require('express');
const routes = express.Router();

const emissions = require('./emissions');

routes.use('/emissions', emissions);

module.exports = routes;