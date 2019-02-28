const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');

const downloadJob = require('./jobs/downloadDataJob');
const perCapitaJob = require('./jobs/calculatePerCapita');
const routes = require('./routes');

app.use(cors());

app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api', routes);

// A job for downloading emissions and population data every day at 1:00,
// with an error schedule of every hour at xx:05 in case of a connecton error
downloadJob.downloadData('0 1 * * *', '5 * * * *');
// A job for calculating per capita emissions every day at 1:02,
// with an error schedule of every hour at xx:07.
perCapitaJob.calculate('2 1 * * *', '7 * * * * *');


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, function () {
    console.log('Server running on port: ', PORT)
});