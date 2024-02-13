import { useSelector } from "react-redux"


const CPChatLisitng = ({ selectedChats, handleClickOnUserForChat }) => {

    const { loginUserDetails } = useSelector((state) => state.chat);

    const oppositeUserName = (loginUserDetails, users) => {
        return users[0]?._id === loginUserDetails?._id ? users[1]?.userName : users[0]?.userName;
    }

    //console.log({ selectedChats });
    return (
        <ul>
            {
                selectedChats &&
                selectedChats?.length > 0 &&
                selectedChats?.map((selectChat, selectedChatIndex) => {
                    const { users } = selectChat;
                    //console.log("selectedChatIndex", users);
                    return (
                        <li className="contact" key={selectedChatIndex} onClick={() => handleClickOnUserForChat(selectChat)}>
                            <div className="wrap">
                                <span className="contact-status online" />

                                <div className="meta">
                                    <p className="name">
                                        {
                                            selectChat?.isGroupChat ? selectChat?.chatName : oppositeUserName(loginUserDetails, users)
                                        }
                                    </p>
                                    <p className="preview">Latest Message</p>
                                </div>
                            </div>
                        </li>
                    )
                })
            }

        </ul>
    )
}

export default CPChatLisitng
