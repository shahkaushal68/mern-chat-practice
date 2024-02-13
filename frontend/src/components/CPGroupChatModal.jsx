
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import useCPGroupChatModalHook from '../hooks/chat/useCPGroupChatModalHook';

const CPGroupChatModal = ({
    show,
    handleClose,
    handleSetSelectedChat
}) => {
    const {
        options,
        selectedOption,
        setSelectedOption,
        groupName,
        handleChangeGroupName,
        handleClickOnCreate
    } = useCPGroupChatModalHook(handleClose, handleSetSelectedChat);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Create a New Group
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="group-form">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Group name"
                                value={groupName}
                                onChange={(event) => handleChangeGroupName(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <Select
                                isMulti={true}
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleClickOnCreate}
                    >Create</button>

                </Modal.Footer>
            </Modal>

        </>


    )
}

export default CPGroupChatModal
