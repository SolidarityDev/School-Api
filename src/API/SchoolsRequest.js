import axios from 'axios';

const appID = '44ac36d9';
const appKey = 'a1cfb6f9f15aafe376aea4be7cdfaabf';

const apiUrl = "https://api.schooldigger.com/v1.2/schools";

const httpClient = axios.create({
    baseUrl : `${apiUrl}`,
    mode: "no-cors",
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add a request interceptor
httpClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.url = config.url + '&'+ [`appId=${appID}`, `appKey=${appKey}`].join('&') ;

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export const retrieveSchools = (st, query = null, perPage = 10) => {
    let args = [`st=${st}`, `perPage=${perPage}`];

    if (query) {
    args.push(`q=${query}`)
    }

    return httpClient.get(`${apiUrl}?${args.join('&')}`);
}



