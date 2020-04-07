import axios from 'axios';
import http from 'http';
import logger from '../logging/logger.mjs';

const buildUrlWithParams = (url, params) => {
    let _url = url + (params ? "?" : "");
    for (let param in params) {
        _url += param + "=" + params[param];
    }
    return _url;
};

const DataExchangeService = {

    get: (url, params, callback) => {
        const _url = buildUrlWithParams(url, params);

        http.get(_url, (response) => {
            let data = '';

            // A chunk of data has been received.
            response.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received.
            response.on('end', () => {
                callback(JSON.parse(data));
            });

        }).on("error", (err) => {
            logger.error("Data exchange error: " + err.message);
        });
    },

    getWithPromise: (url, params) => {
        const _url = buildUrlWithParams(url, params);
        try {
            return axios.get(_url);
        } catch (error) {
            logger.error("failed to get: " + error);
        }
    },

    awaitGet: async (url, params) => {
        const _url = buildUrlWithParams(url, params);
        try {
            return await axios.get(_url);
        } catch (error) {
            logger.error("failed to get: " + error);
        }

    }

};

export default DataExchangeService;
