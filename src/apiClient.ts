import fetch from 'node-fetch';

async function getJSON(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export default getJSON;
