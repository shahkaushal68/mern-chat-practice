import { axiosApi } from "../apis/axiosApi";

export const doSendMessage = async (data) => {
    try {
        const response = await axiosApi({
            url: "/v1/message/send-message",
            method: "POST",
            data: data
        });
        return response;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const doFetchAllMessages = async (id) => {
    try {
        const response = await axiosApi({
            url: `v1/message/${id}`,
            method: "GET",
        });
        return response;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}