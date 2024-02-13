import { axiosApi } from "../apis/axiosApi";

export const doCreateOrAccessChat = async (data) => {
    //console.log("doCreateOrAccessChat ---data-------", data);
    try {
        const response = await axiosApi({
            url: `/v1/chat`,
            method: "Post",
            data: data
        })
        return response;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const doFetchAllChatsOfUser = async () => {
    try {
        const response = await axiosApi({
            url: `/v1/chat`,
            method: "Get",
        })
        return response;
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const doCreateGroupChat = async (data) => {
    try {
        const groupChatResponse = await axiosApi({
            url: `/v1/chat/group`,
            method: "Post",
            data: data
        });
        return groupChatResponse
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}

export const doUpdateGroupName = async (data) => {
    try {
        const groupChatResponse = await axiosApi({
            url: `/v1/chat/group/rename`,
            method: "Put",
            data: data
        });
        return groupChatResponse
    } catch (error) {
        const errMsg = error && error.response && error.response.data;
        return errMsg;
    }
}