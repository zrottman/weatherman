import * as dotenv from 'dotenv';
//const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.API_KEY_OPENWEATHERMAP;
if (!apiKey) {
    console.error('API key not set. Plase check .env file.');
    process.exit(1);
}

const config = {
    apiKey: apiKey,
}

export default config;
