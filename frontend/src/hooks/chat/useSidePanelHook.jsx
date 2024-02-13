import { useState } from "react";
import { doGetAllUsers } from "../../actions/userAction";
import { useEffect } from "react";
import { doCreateOrAccessChat, doFetchAllChatsOfUser } from "../../actions/chatActions";
import { useDispatch } from "react-redux";
import { loginUser, selectUser } from "../../redux/features/chatSlice";
import { useNavigate } from "react-router-dom";
import { selectContent } from "../../redux/features/chatContentSlice";

const useSidePanelHook = () => {
    const [activeSidepanel, setActiveSidePanel] = useState(false);
    const [registerdUsers, setRegisterdUsers] = useState([]);
    const [selectedChats, setSelectedChats] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getAllRegisteredUsers();
        getAllChatsOfUser();
    }, [])

    const getAllRegisteredUsers = async (value) => {
        try {
            const allRegisteredUsersResponse = await doGetAllUsers(value);
            if (allRegisteredUsersResponse?.status === 200) {
                setRegisterdUsers(allRegisteredUsersResponse?.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getAllChatsOfUser = async () => {
        try {
            const allChatsOfUserResponse = await doFetchAllChatsOfUser();
            //console.log("allChatsOfUserResponse---", allChatsOfUserResponse);
            if (allChatsOfUserResponse?.status === 200) {
                dispatch(selectUser(allChatsOfUserResponse?.data?.data));
                setSelectedChats(allChatsOfUserResponse?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickOnLogout = () => {
        localStorage.removeItem("_token");
        dispatch(selectUser(null));
        dispatch(loginUser(null));
        navigate("/");
    }


    const handleOnChangeSearch = (value) => {
        getAllRegisteredUsers(value);
    }

    const handleClickForSidePanel = (value) => [
        setActiveSidePanel(value)
    ]

    const handleSetSelectedChat = (value) => {
        setSelectedChats([
            ...selectedChats,
            value
        ])
    }

    const handleClickOnUserForAccessChat = async (userId) => {
        //console.log("user", userId);
        try {
            const accessChatResponse = await doCreateOrAccessChat({
                userID: userId
            });
            //console.log({ accessChatResponse });
            if (accessChatResponse?.status === 200) {
                //setSelectedUser();
                //dispatch(selectUser(accessChatResponse?.data?.data))
                if (accessChatResponse?.data?.message === "Chat Successfully Created") {
                    setSelectedChats([
                        ...selectedChats,
                        accessChatResponse?.data?.data
                    ])
                }
                setActiveSidePanel(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickOnUserForChat = (selectChat) => {
        //console.log({ selectChat });
        dispatch(selectContent(selectChat));
    }

    return {
        show,
        handleShow,
        handleClose,
        activeSidepanel,
        registerdUsers,
        selectedChats,
        handleSetSelectedChat,
        handleClickForSidePanel,
        handleClickOnUserForAccessChat,
        handleOnChangeSearch,
        handleClickOnLogout,
        handleClickOnUserForChat
    }

}

export default useSidePanelHook;