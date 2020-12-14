import axios from 'axios';
import * as LocalApi from "../stub/local-api.json"
import { enablesStub } from '../actions/index.js';
const appID = '779b2191'; //Enter your own appID.
const appKey = 'af8a21b8eae8eed3665f131394ad85e7'; //Enter your own appKey.

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
    if (enablesStub){
        axios.get({LocalApi})
        .then(function(response){
          console.log(response.data);
        })
        .catch(function(error){
          alert('error');
        });
    }

    return httpClient.get(`${apiUrl}?${args.join('&')}`);
}



