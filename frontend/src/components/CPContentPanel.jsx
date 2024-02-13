import { useSelector } from "react-redux";
import CPUpdateGroupChatModal from "./CPUpdateGroupChatModal";
import useCPContentPanelHook from "../hooks/chat/useCPContentPanelHook";




const CPContentPanel = () => {
    const { selectedContent } = useSelector((state) => state.chatContentReducer);
    const { loginUserDetails } = useSelector((state) => state?.chat);

    const {
        show,
        inputMessage,
        fetchAllMessages,
        handleClose,
        handleShow,
        handleChangeOnMessageInput,
        handleOnkeyDown
    } = useCPContentPanelHook();

    if (selectedContent) {
        const { users } = selectedContent;

        const oppositeUserName = (users, loginUserDetails) => {
            return loginUserDetails?._id === users[0]?._id ? users[1]?.userName : users[0]?.userName
        }




        return (
            <>
                <div className="contact-profile">
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="user" />
                    <p>{selectedContent?.isGroupChat ? selectedContent?.chatName : oppositeUserName(users, loginUserDetails)}</p>
                    {
                        selectedContent?.isGroupChat && (
                            <div className="social-media">
                                <i
                                    onClick={handleShow}
                                    type="button"
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                />
                            </div>
                        )
                    }


                </div>

                <div className="messages">
                    <ul>
                        {
                            fetchAllMessages?.map((message, messageIndex) => {
                                let isSender = message?.sender?._id === loginUserDetails?._id;
                                return (
                                    <li className={isSender ? "sent" : "replies"} key={messageIndex}>
                                        <span>{message?.sender?.userName}</span>
                                        <p>{message?.content}</p>
                                    </li>
                                )
                            })
                        }



                    </ul>
                </div>

                <div className="message-input">
                    <div className="wrap">
                        <input
                            type="text"
                            value={inputMessage}
                            placeholder="Write your message..."
                            onChange={(event) => handleChangeOnMessageInput(event.target.value)}
                            onKeyDown={(event) => handleOnkeyDown(event)}
                        />
                    </div>
                </div>



                <CPUpdateGroupChatModal selectedContent={selectedContent} handleClose={handleClose} show={show} />
            </>


        )
    } else {
        return (
            <>
                <p>Please Select Chat First</p>


            </>
        )
    }
}
export default CPContentPanel
