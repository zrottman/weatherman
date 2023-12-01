import * as types from './types.js';

function formatWeather(response: types.Success): string {
    const output: string = `It's currently ${response.main.temp} degrees F ` +
                           `and ${response.weather[0].main.toLowerCase()} ` +
                           `in beautiful ${response.name}.`;
    
    return output;
}

export default formatWeather;
