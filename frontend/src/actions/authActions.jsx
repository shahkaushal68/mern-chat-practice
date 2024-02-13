import { axiosApi } from "../apis/axiosApi";

export const doRegister = async (data) => {
    try {
        const response = await axiosApi({
            url: "/v1/auth/register",
            method: "Post",
            data: data
        })
        return response;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const doLogin = async (data) => {
    try {
        const response = await axiosApi({
            url: "/v1/auth/login",
            method: "Post",
            data: data
        })
        return response;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const doGetLoginUserDetail = async () => {
    try {
        const response = await axiosApi({
            url: "/v1/auth/user-details",
            method: "Get",
        })
        return response;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}
