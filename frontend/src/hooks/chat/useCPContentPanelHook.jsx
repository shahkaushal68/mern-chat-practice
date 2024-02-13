import { useEffect, useState } from "react";
import { doFetchAllMessages, doSendMessage } from "../../actions/messageAction";
import { useSelector } from "react-redux";
import socket from "../../io";


const useCPContentPanelHook = () => {
    const { selectedContent } = useSelector((state) => state?.chatContentReducer);
    const { loginUserDetails } = useSelector((state) => state?.chat);
    const [show, setShow] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [fetchAllMessages, setFetchAllMessages] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let selectedContentCompare;
    useEffect(() => {
        fetchChatMessages();
        selectedContentCompare === selectedContent;
    }, [selectedContent, selectedContentCompare]);

    useEffect(() => {
        socket.emit("setup", loginUserDetails);
    }, [loginUserDetails]);

    useEffect(() => {
        //console.log("useEffect :: fetchAllMessages :::::::", { fetchAllMessages });
        socket.on("receive_message", (newMessageReceive) => {
            // console.log("newMessageReceive--------------react", newMessageReceive);
            if (!selectedContent || selectedContent?._id !== newMessageReceive?.chat?._id) {
                //Send Notification
            } else {
                console.log({ fetchAllMessages });
                setFetchAllMessages([...fetchAllMessages], newMessageReceive);
            }
        })
    });


    const fetchChatMessages = async () => {
        const fetchMessagesResponse = await doFetchAllMessages(selectedContent?._id);
        //console.log({ fetchMessagesResponse });
        if (fetchMessagesResponse?.status === 200) {
            setFetchAllMessages(fetchMessagesResponse?.data?.data);
            socket.emit("join_chat", selectedContent?._id);
        }
    }

    const handleChangeOnMessageInput = (value) => {
        setInputMessage(value)
    }
    const handleOnkeyDown = async (event) => {
        if (event.key === "Enter" && inputMessage) {
            setInputMessage("");
            const data = {
                content: inputMessage,
                chatId: selectedContent?._id
            }
            const sendMessageresponse = await doSendMessage(data);
            //console.log("sendMessageresponse-----------------", sendMessageresponse);
            if (sendMessageresponse?.status === 200) {
                setFetchAllMessages([...fetchAllMessages, sendMessageresponse?.data?.data]);
                socket.emit("new_message", sendMessageresponse?.data?.data);
            }
        }
    }

    return {
        show,
        inputMessage,
        fetchAllMessages,
        handleClose,
        handleShow,
        handleChangeOnMessageInput,
        handleOnkeyDown
    }
}

export default useCPContentPanelHook
