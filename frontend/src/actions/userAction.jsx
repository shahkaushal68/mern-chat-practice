import { axiosApi } from "../apis/axiosApi";

export const doGetAllUsers = async (value) => {
    try {
        const response = await axiosApi({
            url: `/v1/users?search=${value !== undefined ? value : ""}`,
            method: "Get",
        })
        return response?.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const doRemoveUser = async (data) => {
    try {
        const response = await axiosApi({
            url: `/v1/chat/group/remove`,
            method: "Put",
            data: data
        })
        return response?.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const doAddUser = async (data) => {
    try {
        const response = await axiosApi({
            url: `/v1/chat/group/add`,
            method: "Put",
            data: data
        })
        return response?.data;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}