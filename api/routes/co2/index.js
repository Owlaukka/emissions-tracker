const express = require('express');
const cotwoRoutes = express.Router();

const cotwoList = require('../../controllers/cotwoController');

// dummy get route
cotwoRoutes.get('/', cotwoList.list_all_emissions);



module.exports = cotwoRoutes;