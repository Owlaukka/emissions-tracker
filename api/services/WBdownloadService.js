const request = require('request');
const fs = require('fs');

const unzipper = require('unzipper');
const xmlToJson = require('xml-to-json-stream');
const JSONStream = require('JSONStream');
const through2 = require('through2');


exports.downloadEmissionsFromWB = async function () {
    return await downloadAndParse(
        'http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=xml',
        './data/all_emissions.json');
}

exports.downloadPopulationFromWB = async function () {
    return await downloadAndParse(
        'http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=xml',
        './data/population.json');
}

function downloadAndParse(address, outputFile) {
    return new Promise((resolve, reject) => {
        request(address)
            .on('error', (err) => {
                reject(console.error('error: ', err));
            })
            .pipe(unzipper.Parse())
            .on('entry', (entry) => {
                const stream = xmlToJson().createStream();
                const jsonFile = fs.createWriteStream(outputFile)

                entry.pipe(stream)
                    .on('error', (err) => {
                        reject(console.error('error: ', err));
                    })
                    .pipe(JSONStream.parse('Root.data.record.*'))
                    .on('error', (err) => {
                        reject(console.error('error: ', err));
                    })
                    .pipe(through2.obj(formatData))
                    .on('error', (err) => {
                        reject(console.error('error: ', err));
                    })
                    .pipe(JSONStream.stringify())
                    .on('error', (err) => {
                        reject(console.error('error: ', err));
                    })
                    .pipe(jsonFile)
                    .on('error', (err) => {
                        reject(console.error('error: ', err));
                    })
                    .on('finish', () => {
                        jsonFile.close();
                        resolve(console.log('Writing finished.'));
                    });

            })
            .on('error', (err) => {
                reject(console.error('error: ', err));
            })

    });
}

function formatData(chunk, enc, callback) {
    const formattedData = {
        country: chunk.field[0].textNode,
        countrycode: chunk.field[0].key,
        year: chunk.field[2].textNode,
        value: chunk.field[3].textNode
    }

    this.push(formattedData);

    callback();
}
