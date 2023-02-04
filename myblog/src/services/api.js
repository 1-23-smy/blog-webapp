import axios from 'axios';
import { API_NOTIFICATION_MSG, SERVICE_URLS } from '../constants/config.js';
const API_URL = "http://localhost:3001"
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Accept":"application/json,form-data",
        "Content-Type": "application/json",

    }
});
axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
)
axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (err) {
        return Promise.reject(processError(err));
    }
)
const processResponse = (response) => {
    if (response?.status === 200) {

        return { isSuccess: true, data: response.data }
    }
    else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
};
const processError = (err) => {
    if (err.response) {
        console.log('Error in response', err.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MSG.responseFailure,
            code: err.response.status
        }
    }
    else if (err.request) {
        console.log('Error in request', err.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MSG.requestFailure,
            code: ""
        }
    }
    else {
        console.log('Error in network', err.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MSG.networkError,
            code: ""
        }
    }
}

const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data:body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let PercentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(PercentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let PercentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(PercentageCompleted);
                }
            }
        })

}
export { API };