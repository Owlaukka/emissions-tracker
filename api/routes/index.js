const express = require('express');
const routes = express.Router();

const co2 = require('./co2');

routes.use('/co2', co2);

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;