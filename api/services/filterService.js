


exports.filterNonCountriesAndUndefinedValues = function (entry) {
    if (entry.value && isCountry(entry.countrycode)) {
        return entry;
    } else {
        return undefined;
    }
}

isCountry = function (countrycode) {
    switch (countrycode) {
        case 'WLD':
            return false;
        case 'IBT':
            return false;
        case 'LMY':
            return false;
        case 'IBD':
            return false;
        case 'MIC':
            return false;
        case 'UMC':
            return false;
        case 'HIC':
            return false;
        case 'LTE':
            return false;
        case 'OED':
            return false;
        case 'EAS':
            return false;
        case 'PST':
            return false;
        case 'EAP':
            return false;
        case 'TEA':
            return false;
        case 'ECS':
            return false;
        case 'EAR':
            return false;
        case 'NAC':
            return false;
        case 'EUU':
            return false;
        case 'LMC':
            return false;
        case 'TEC':
            return false;
        case 'ECA':
            return false;
        case 'EMU':
            return false;
        case 'MEA':
            return false;
        case 'SAS':
            return false;
        case 'TSA':
            return false;
        case 'LCN':
            return false;
        case 'TLA':
            return false;
        case 'ARB':
            return false;
        case 'LAC':
            return false;
        case 'MNA':
            return false;
        case 'TMN':
            return false;
        case 'SSF':
            return false;
        case 'TSS':
            return false;
        case 'SSA':
            return false;
        case 'IDA':
            return false;
        case 'CEB':
            return false;
        case 'IDB':
            return false;
        case 'FCS':
            return false;
        case 'PRE':
            return false;
        case 'IDX':
            return false;
        case 'SST':
            return false;
        case 'LIC':
            return false;
        case 'LDC':
            return false;
        case 'OSS':
            return false;
        case 'HPC':
            return false;
        case 'CSS':
            return false;
        case 'PSS':
            return false;

        default:
            return true;
    }
}

exports.isCountry