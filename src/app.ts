import fetch from 'node-fetch';
import config from './config.js';
import * as types from './types.js';


async function getJSON(url: string) {
    const response = await fetch(url);
    const body = await response.json();
    return body;
}

function isFailure(response: types.APIResponse): response is types.Failure {
    return typeof response.cod === 'string';
}

// validate num args
if (process.argv.length > 3) {
    console.log("usage: node main.js [<zip> (optional)]");
    process.exit(1);
}

// validate zip arg if present
let zip: string = '90032';
if (process.argv.length == 3) {
    const validZip = /^\d{5}$/;
    if (!validZip.test(process.argv[2])) {
        console.log("invalid zip format.");
        process.exit(2);
    }
    zip = process.argv[2];
}

async function main() {
    const url: string = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${config.apiKey}`;
    let res = await getJSON(url) as types.APIResponse;

    if (isFailure(res)) {
        console.error(`Error retrieving weather for zip code ${zip}: ${res.message}`);
        process.exit(3);
    }

    const output: string = `It's currently ${res.main.temp} degrees Fahrenheit and ${res.weather[0].main.toLowerCase()} in beautiful ${res.name}.`;
    console.log(output);
}

main().catch(error => {
    console.error('An error occured: ', error);
});

