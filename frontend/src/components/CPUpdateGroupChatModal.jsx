
import Modal from 'react-bootstrap/Modal';


import useCPUpdateGroupChatModalHook from '../hooks/chat/useCPUpdateGroupChatModalHook';

const CPUpdateGroupChatModal = ({
    show,
    handleClose,
    selectedContent,
}) => {
    const {
        groupName,
        allGroupMembers,
        allRegisteredUsers,
        handleClickForRemoveMember,
        handleChangeGroupName,
        handleClickUpdateGroupName,
        handleSelectUserForAdd,
        handleClickAddUser
    } = useCPUpdateGroupChatModalHook();
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {selectedContent?.isGroupChat && selectedContent?.chatName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="users-listing">
                    <ul className="nav">
                        {
                            allGroupMembers?.map((user, userIndex) => {
                                return (
                                    <li
                                        key={userIndex}
                                        className="nav-item"
                                        onClick={() => handleClickForRemoveMember(user)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {user?.userName}  <i className="fa fa-close" aria-hidden="true" />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="form-group update-group-name">
                    <input
                        type="text"
                        className="form-control"
                        value={groupName}
                        onChange={(event) => handleChangeGroupName(event.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleClickUpdateGroupName(selectedContent?._id)}
                    >
                        Update
                    </button>
                </div>
                <div className="userAdd-section">
                    <select
                        className="form-select"
                        onChange={handleSelectUserForAdd}
                    >
                        <option selected disabled>Select User</option>
                        {
                            allRegisteredUsers?.map((member, memberIndex) => {
                                //console.log("member", member);
                                return (
                                    <option value={member?._id} key={memberIndex}>{member?.userName}</option>
                                )
                            })
                        }
                    </select>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleClickAddUser}
                    >Add
                    </button>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default CPUpdateGroupChatModal
