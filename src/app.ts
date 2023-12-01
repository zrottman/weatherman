import config from './config.js';
import * as types from './types.js';
import formatWeather from './formatter.js';
import * as utils from './utils.js';
import getJSON from './apiClient.js';

async function main() {

    // validate num args
    if (!utils.validateArgs(process.argv)) {
        console.log("usage: node main.js [<zip> (optional)]");
        process.exit(1);
    }

    // get zip
    const defaultZip: string = '90032';
    const zip: string = utils.getZip(process.argv, defaultZip);

    // build API url
    const url: string = `https://api.openweathermap.org/data/2.5/weather?` +
                        `zip=${zip}&units=imperial&appid=${config.apiKey}`;

    // make API request
    const response = await getJSON(url) as types.APIResponse;

    // check for failure
    if (utils.isFailure(response)) {
        console.error(`Error retrieving weather for zip code ${zip}: ${response.message}`);
        process.exit(2);
    }

    // print result
    console.log(formatWeather(response));
}

main().catch(error => {
    console.error('An error occured: ', error);
});

