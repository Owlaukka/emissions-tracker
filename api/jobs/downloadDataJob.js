const schedule = require('node-schedule');

const errorHandler = require('./jobErrorHandling');

const WBdownloader = require('../services/WBdownloadService');

exports.downloadData = function (normalSchedule, errorSchedule) {
    let tryCount = 0;
    let j = schedule.scheduleJob(normalSchedule, async function () {
        try {
            await download(WBdownloader.downloadEmissionsFromWB(), j, normalSchedule);
            tryCount = 0;
        } catch (err) {
            tryCount = errorHandler.handleJobError(tryCount, 'emissions data', j);
        }

        try {
            await download(WBdownloader.downloadPopulationFromWB(), j);
            tryCount = 0;
        } catch (err) {
            tryCount = errorHandler.handleJobError(tryCount, 'population data', j, normalSchedule, errorSchedule);
        }
    });
}

async function download(downloader, job, normalSchedule) {
    await downloader;
    job.reschedule(normalSchedule)
}