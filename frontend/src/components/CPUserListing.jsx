const CPUserListing = ({ user, handleClickOnUser }) => {
    return (
        <li className="contact" onClick={handleClickOnUser}>
            <div className="wrap">
                <span className="contact-status online" />
                <img src={user?.image} alt="user" />
                <div className="meta">
                    <p className="name">{user?.userName}</p>
                    <p className="preview">Latest Message</p>
                </div>
            </div>
        </li>
    )
}

export default CPUserListing
