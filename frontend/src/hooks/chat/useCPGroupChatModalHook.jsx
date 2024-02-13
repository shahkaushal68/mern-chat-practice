import { useState } from "react";
import { doGetAllUsers } from "../../actions/userAction";
import { useEffect } from "react";
import { doCreateGroupChat } from "../../actions/chatActions";
import { toast } from 'react-toastify';

const useCPGroupChatModalHook = (handleClose, handleSetSelectedChat) => {



    const [groupName, setGroupName] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [allRegisteredUsers, setAllRegisteredUsers] = useState([]);

    useEffect(() => {
        fetchAllRegisteredUsers()
    }, [])

    const fetchAllRegisteredUsers = async () => {
        try {
            const allRegisteredUsersResponse = await doGetAllUsers();
            if (allRegisteredUsersResponse?.status === 200) {
                setAllRegisteredUsers(allRegisteredUsersResponse?.data)
            }
        } catch (error) {
            //console.log("error", error); 
        }
    }

    const handleChangeGroupName = (value) => {
        setGroupName(value);
    }
    //console.log("groupName----------", groupName);
    //console.log("selectedOption----------", selectedOption);

    //console.log("allRegisteredUsers----------", allRegisteredUsers);



    const handleClickOnCreate = async () => {
        if (!groupName || !selectedOption) return toast.error("Please Fill up the fields")
        let selecteItems = selectedOption?.map((item) => item?.value);
        selecteItems = JSON.stringify(selecteItems)
        const createGruopChatData = {
            "chatName": groupName,
            "users": selecteItems
        }
        const createGroupChatResponse = await doCreateGroupChat(createGruopChatData);
        if (createGroupChatResponse?.status === 200) {
            //console.log("createGroupChatResponse---------", createGroupChatResponse);
            handleSetSelectedChat(createGroupChatResponse?.data?.data);
            setGroupName("");
            setSelectedOption(null);
            handleClose();
        }

    }

    const options = allRegisteredUsers?.map((user) => {
        return {
            value: user?._id, label: user?.userName
        }
    })

    return {
        options,
        selectedOption,
        setSelectedOption,
        groupName,
        handleChangeGroupName,
        handleClickOnCreate

    }
}

export default useCPGroupChatModalHook
