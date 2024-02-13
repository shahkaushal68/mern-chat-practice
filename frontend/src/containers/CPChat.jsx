import CPContentPanel from "../components/CPContentPanel"
import CPSidePanel from "../components/CPSidePanel"
import "../styles/chatpage.css"

const CPChat = () => {
    return (
        <>
            <div id="frame">
                <div id="sidepanel">
                    <CPSidePanel />
                </div>
                <div className="content">
                    <CPContentPanel />
                </div>
            </div>


        </>

    )
}

export default CPChat
