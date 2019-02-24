const dataGenerator = require('../services/dataGenerationService');

// /api/emissions/countries/all/absolute
exports.listAbsoluteEmissions = async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    emissionStream = await dataGenerator.getAbsoluteEmissions()
    emissionStream.pipe(res);
}

// /api/emissions/countries/all/per_capita
exports.listPerCapitaEmissions = async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    emissionStream = await dataGenerator.getPerCapitaEmissions()

    emissionStream.pipe(res);
}

// /api/emissions/countries/:countrycode/absolute/range/:start-:end
exports.listAbsoluteEmissionsForCountryInTimeFrame = async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    emissionStream = await dataGenerator
        .getAbsoluteCountryEmissionsInRange(req.params.countrycode, req.params.start, req.params.end);

    emissionStream.pipe(res);

}

// /api/emissions/countries/${countrycode}/per_capita/range/${start}-${end}
exports.listPerCapitaEmissionsForCountryInTimeFrame = async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    emissionStream = await dataGenerator
        .getPerCapitaCountryEmissionsInRange(req.params.countrycode, req.params.start, req.params.end);

    emissionStream.pipe(res);

}