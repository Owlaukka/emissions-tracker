exports.handleJobError = function (tryCount, dataName, job, normalSchedule, errorSchedule) {
    console.log('New ', dataName, ' could not be attained. Time: ', new Date(),
        '\nTry count: ', tryCount);
    tryCount++;
    errorRescheduler(tryCount, job, normalSchedule, errorSchedule);
    return tryCount;
}

function errorRescheduler(tryCount, job, normalSchedule, errorSchedule) {
    if (tryCount > 9) {
        tryCount = 0;
        job.reschedule(normalSchedule)
    } else {
        job.reschedule(errorSchedule);
    }
    return tryCount;
}