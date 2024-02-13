
import useSidePanelHook from '../hooks/chat/useSidePanelHook';
import CPUserListing from './CPUserListing';
import CPChatLisitng from './CPChatLisitng';
import { useSelector } from 'react-redux';
import CPGroupChatModal from './CPGroupChatModal';




const CPSidePanel = () => {
    const { loginUserDetails } = useSelector((state) => state?.chat);
    const {
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
    } = useSidePanelHook();

    return (
        <>
            <div id="profile">
                <div className="wrap">
                    <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online" alt="user" />
                    <p>{loginUserDetails?.userName}</p>
                </div>
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"></button>
                    <ul className="dropdown-menu">
                        <li style={{ cursor: "pointer" }} onClick={handleShow}><span className="dropdown-item" >Create Group</span></li>
                        <li style={{ cursor: "pointer" }} onClick={handleClickOnLogout}><span className="dropdown-item" >Logout</span></li>
                    </ul>
                </div>
            </div>
            <div id="search">
                <label><i className="fa fa-search" aria-hidden="true" /></label>
                <input
                    type="none"
                    style={{ cursor: "pointer" }}
                    placeholder="Search contacts..."
                    onClick={() => handleClickForSidePanel(true)}
                />
            </div>
            <div id="mySidepanel" className={activeSidepanel ? "sidepanel visibleSidePanel" : 'sidepanel hideSidePanel'}>
                <span
                    className="closebtn"
                    onClick={() => handleClickForSidePanel(false)}
                >×</span>
                <div id="search">
                    <label><i className="fa fa-search" aria-hidden="true" /></label>
                    <input
                        type="text"
                        placeholder="Enter name here..."
                        onChange={(event) => handleOnChangeSearch(event.target.value)}
                    />
                </div>
                <div id="contacts" className='sidePanel-contact'>
                    <ul>
                        {
                            registerdUsers &&
                            registerdUsers?.length > 0 &&
                            registerdUsers?.map((registerUser, registerUserIndex) => {
                                return (
                                    <CPUserListing
                                        key={registerUserIndex}
                                        user={registerUser}
                                        handleClickOnUser={() => handleClickOnUserForAccessChat(registerUser?._id)}
                                    />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div id="contacts">
                <CPChatLisitng
                    selectedChats={selectedChats}
                    handleClickOnUserForChat={handleClickOnUserForChat}
                />
            </div>
            <div id="bottom-bar">
                <button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true" /> <span>Add contact</span></button>
                <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true" /> <span>Settings</span></button>
            </div>

            {/* Create Group Modal */}

            <CPGroupChatModal show={show} handleClose={handleClose} handleSetSelectedChat={handleSetSelectedChat} />


        </>
    )
}

export default CPSidePanel
