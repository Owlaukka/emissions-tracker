const schedule = require('node-schedule');

const errorHandler = require('./jobErrorHandling');

const dataGenerator = require('../services/dataGenerationService');

exports.calculate = function (normalSchedule, errorSchedule) {
    let tryCount = 0;
    let j = schedule.scheduleJob(normalSchedule, async function () {
        try {
            await dataGenerator.calculatePerCapita();
            tryCount = 0;
        } catch (err) {
            tryCount = errorHandler.handleJobError(tryCount, 'per capita data', j, normalSchedule, errorSchedule);
        }
    });
}
