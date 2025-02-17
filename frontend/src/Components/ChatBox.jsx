import '../Styles/ChatBox.css'

const ChatBox = ({image, name, setActualChat, setIsOpen, infoProfile}) =>{

    function click(){
        setActualChat(infoProfile.id);
        setIsOpen(true);
    }
    return (
        <button className="chatBox" onClick={() => click()}>
            <div className="photoContainer">
                <img src = {`/PhotoProfiles/${image}`} alt="" className='photoProfile' />
            </div>
                <div className="textContainer">
                        <p className="nameProfile">{name}</p>
                </div>
                <div className="timeContainer">

                </div>
        </button>
    );
}

export default ChatBox;