import axios from 'axios';

import config from "../config"
//const baseDomain = 'https://beta.apinouthemes.com'; // API for products

//const baseDomain = 'http://localhost:1338';

var baseDomain;


if (process.env.NODE_ENV == "development"){
   baseDomain = config.DEVURL + "/api";
}  else {
   baseDomain = config.PRODURL + "/api";
}


export const basePostUrl = 'https://beta.apinouthemes.com'; // API for post
export const baseStoreURL = 'https://beta.apinouthemes.com'; // API for vendor(store)

export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};