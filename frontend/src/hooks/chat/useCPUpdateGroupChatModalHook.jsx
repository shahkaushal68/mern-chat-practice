
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doAddUser, doGetAllUsers, doRemoveUser } from "../../actions/userAction";
import { toast } from "react-toastify";
import { removeUser, selectContent } from "../../redux/features/chatContentSlice";
import { doUpdateGroupName } from "../../actions/chatActions";


const useCPUpdateGroupChatModalHook = () => {
    const { loginUserDetails } = useSelector((state) => state.chat);
    const { selectedContent } = useSelector((state) => state.chatContentReducer);
    const { selectedContent: { users } } = useSelector((state) => state.chatContentReducer);

    const [allRegisteredUsers, setAllRegisteredUsers] = useState([]);
    const [allGroupMembers, setAllGroupMembers] = useState([]);

    const [groupName, setGroupName] = useState(selectedContent?.chatName);
    const [selectedMember, setSelectedMember] = useState({});


    const dispatch = useDispatch();

    console.log({
        // loginUserDetails,
        // users,
        allRegisteredUsers,
        allGroupMembers,
        // groupName
    });

    useEffect(() => {
        fetchAllRegisterdUsers();
    }, []);



    useEffect(() => {
        groupMembers();
    }, [loginUserDetails, users, dispatch]);

    const groupMembers = () => {
        const all = users.filter((item) => item?._id !== loginUserDetails?._id);
        setAllGroupMembers(all);
    }

    const fetchAllRegisterdUsers = async () => {
        const fetchAllRegisterdUsersResponse = await doGetAllUsers();
        if (fetchAllRegisterdUsersResponse?.status === 200) {
            //console.log(fetchAllRegisterdUsersResponse);
            setAllRegisteredUsers(fetchAllRegisterdUsersResponse?.data);
        }
    }


    const handleClickForRemoveMember = async (user) => {
        const data = {
            "chatId": selectedContent?._id,
            "userId": user?._id
        }
        const removeMemberResponse = await doRemoveUser(data);
        if (removeMemberResponse?.status === 200) {
            toast.success(removeMemberResponse?.message);
            let deletedMember = allGroupMembers?.filter((item) => item?._id !== user?._id);
            setAllGroupMembers(deletedMember);
            // dispatch(selectContent({
            //     ...selectedContent,
            //     users: [...deletedMember]
            // }))
            dispatch(removeUser(deletedMember));

        }
    }
    const handleChangeGroupName = (value) => {
        setGroupName(value)
    }

    const handleClickUpdateGroupName = async (chatId) => {
        const data = {
            chatId,
            chatName: groupName
        }
        const updateGroupNameResponse = await doUpdateGroupName(data);
        if (updateGroupNameResponse?.status === 200) {
            toast.success(updateGroupNameResponse?.data?.message);
            setGroupName(updateGroupNameResponse?.data?.data?.chatName);
        }

    }

    const handleSelectUserForAdd = async (event) => {
        //console.log(event.target.value);
        const member = allRegisteredUsers?.find((item) => item?._id === event.target.value);
        setSelectedMember(member);
        //console.log({ selectedMember });

    }

    const handleClickAddUser = async () => {

        let result = allGroupMembers.some((member) => member?._id === selectedMember?._id);
        if (result) return toast.error("This user is already added!");

        console.log({ result });

        const data = {
            chatId: selectedContent?._id,
            userId: selectedMember?._id
        }
        const addUserResponse = await doAddUser(data);
        console.log({ addUserResponse });
        if (addUserResponse?.status === 200) {
            toast.success(addUserResponse?.message);
            setAllGroupMembers([
                ...allGroupMembers,
                selectedMember
            ]);
            dispatch(selectContent({
                ...selectedContent,
                users: [
                    ...users,
                    selectedMember
                ]
            }));

        } else {
            toast.error(addUserResponse?.message);
        }
    }


    return {
        groupName,
        allGroupMembers,
        selectedMember,
        allRegisteredUsers,
        handleClickForRemoveMember,
        handleChangeGroupName,
        handleClickUpdateGroupName,
        handleSelectUserForAdd,
        handleClickAddUser
    }
}

export default useCPUpdateGroupChatModalHook
