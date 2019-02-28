const express = require('express');
const emissionsRoutes = express.Router();

const emissionsController = require('../../controllers/emissionsController');

// dummy get route
emissionsRoutes.get('/countries/all/absolute', emissionsController.listAbsoluteEmissions);
emissionsRoutes.get('/countries/all/per_capita', emissionsController.listPerCapitaEmissions);

emissionsRoutes.get('/countries/:countrycode/absolute/range/:start-:end',
    emissionsController.listAbsoluteEmissionsForCountryInTimeFrame);

emissionsRoutes.get('/countries/:countrycode/per_capita/range/:start-:end',
    emissionsController.listPerCapitaEmissionsForCountryInTimeFrame);


module.exports = emissionsRoutes;