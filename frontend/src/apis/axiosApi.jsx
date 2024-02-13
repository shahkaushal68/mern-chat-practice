import axios from "axios";

const axiosApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosApi.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("_token")}`,
    'Content-Type': 'application/json'
}

const setAuthHeader = (token) => {
    axiosApi.defaults.headers.Authorization =
        token || `Bearer ${localStorage.getItem("_token")}`;
};


// setting up interceptors
axiosApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.status === 404) {
            console.log("/404");
        } else if (error?.response?.status === 500) {
            console.log("/500");
        } else if (error?.response?.status === 401) {
            console.log("/401");
        } else {
            console.log("/other-errors.");
        }
        return Promise.reject(error);
    }
);

export { axiosApi, setAuthHeader }