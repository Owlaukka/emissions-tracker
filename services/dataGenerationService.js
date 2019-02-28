const fs = require('fs');
const Readable = require('stream').Readable;

const JSONStream = require('JSONStream');

const WBdownloader = require('./WBdownloadService');
const filters = require('./filterService');


exports.getAbsoluteEmissions = async function () {
    const emissionStream = await getEmissions('./data/all_emissions.json',
        WBdownloader.downloadEmissionsFromWB);

    return emissionStream
        .pipe(JSONStream.parse('*', filters.filterNonCountriesAndUndefinedValues))
        .pipe(JSONStream.stringify());
}

exports.getPerCapitaEmissions = async function () {
    const emissionStream = await getEmissions('./data/per_capita_emissions.json',
        this.calculatePerCapita);

    return emissionStream
        .pipe(JSONStream.parse('*', filters.filterNonCountriesAndUndefinedValues))
        .pipe(JSONStream.stringify());
}

exports.getAbsoluteCountryEmissionsInRange = async function (countrycode, start, end) {
    const emissionStream = await getEmissionsInRange(countrycode, start, end,
        './data/all_emissions.json',
        WBdownloader.downloadEmissionsFromWB);

    return emissionStream
        .pipe(JSONStream.parse('*', filters.filterNonCountriesAndUndefinedValues))
        .pipe(JSONStream.stringify());
}

exports.getPerCapitaCountryEmissionsInRange = async function (countrycode, start, end) {
    const emissionStream = await getEmissionsInRange(countrycode, start, end,
        './data/per_capita_emissions.json',
        this.calculatePerCapita);

    return emissionStream
        .pipe(JSONStream.parse('*', filters.filterNonCountriesAndUndefinedValues))
        .pipe(JSONStream.stringify());
}

exports.calculatePerCapita = async function () {
    if (fileDoesNotExistOrIsOld('./data/all_emissions.json')) {
        await WBdownloader.downloadEmissionsFromWB();
    }
    if (fileDoesNotExistOrIsOld('./data/population.json')) {
        await WBdownloader.downloadPopulationFromWB();
    }

    const emissionsData = require('../data/all_emissions.json');
    const popData = require('../data/population.json');

    const perCapitaData = popData.map((pop) => calculatePerCapitaForEntry(pop, emissionsData));

    fs.writeFileSync("./data/per_capita_emissions.json",
        JSON.stringify(perCapitaData));
}




function calculatePerCapitaForEntry(entry, emissionsData) {
    const emissions = emissionsData.find(function (emission) {
        return emission.country === entry.country &&
            emission.year === entry.year;
    }).value;

    return {
        country: entry.country,
        countrycode: entry.countrycode,
        year: entry.year,
        value: emissions && entry.value
            ? parseFloat(emissions) / parseFloat(entry.value)
            : undefined
    }
}

async function getEmissions(emissionsFile, downloader) {
    if (fileDoesNotExistOrIsOld(emissionsFile)) {
        try {
            await downloader();
        } catch (err) {
            return createEmptyStream();
        }
    }
    return fs.createReadStream(emissionsFile);
}

async function getEmissionsInRange(countrycode, start, end, emissionsFile, downloader) {

    if (fileDoesNotExistOrIsOld(emissionsFile)) {
        try {
            await downloader()
        } catch (err) {
            console.log(err)
            return createEmptyStream();
        }
    }

    return fs.createReadStream(emissionsFile)
        .pipe(JSONStream.parse('*', function (entry) {
            if (entry.countrycode === countrycode
                && entry.year >= start && entry.year <= end) {
                return entry;
            } else {
                return undefined;
            }
        }))
        .pipe(JSONStream.stringify());
}

function fileDoesNotExistOrIsOld(filepath) {
    monthAgoDate = new Date(Date.now() - 2592e6);

    return !fs.existsSync(filepath)
        || new Date(fs.statSync(filepath).mtime) < monthAgoDate;
}

function createEmptyStream() {
    const s = new Readable();
    s._read = () => { };
    s.push("{}");
    s.push(null);
    return s;
}