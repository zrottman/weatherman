import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY_OPENWEATHERMAP;

type APIResponse = Success | Failure;

interface Failure {
    cod: string;
    message: string;
}

interface Success {
    coord: Coords;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

interface Coords {
    lon: number;
    lat: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

interface Clouds {
    all: number;
}

interface Sys {
    type: number; 
    id: number; 
    country: string;
    sunrise: number;
    sunset: number;
}

async function getJSON(url: string) {
    const response = await fetch(url);
    const body = await response.json();
    return body;
}

function isFailure(response: APIResponse): response is Failure {
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

const url: string = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${apiKey}`;
let res = await getJSON(url) as APIResponse;

if (isFailure(res)) {
    console.error(`Error retrieving weather for zip code ${zip}: ${res.message}`);
    process.exit(3);
}

const output: string = `It's currently ${res.main.temp} degrees Fahrenheit and ${res.weather[0].main.toLowerCase()} in beautiful ${res.name}.`;
console.log(output);
