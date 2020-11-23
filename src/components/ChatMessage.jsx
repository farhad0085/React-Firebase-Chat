import React from 'react'
import { Menu, Item, contextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

function ChatMessage({ message, auth, deleteMessage }) {

    const { text, uid, photoURL } = message

    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

    const handleMouseDownTextSelection = event => {
        // user can copy the text but not using double click.
        if(event.detail > 1){
            event.preventDefault()
        }
    }

    const openContextMenu = e => {
        e.preventDefault();
        contextMenu.show({
            id: message.id,
            event: e,
            props: {}
        });
    }

    return (
        <>
            <div className={`message ${messageClass}`}>
                <img
                    src={
                        photoURL ||
                        "https://api.adorable.io/avatars/23/abott@adorable.png"
                    }
                    alt="loading"
                />
                <p onMouseDown={handleMouseDownTextSelection} onDoubleClick={openContextMenu}>{text}</p>
            </div>

            <Menu id={message.id}>
                <Item onClick={() => console.log("Edit button clicked")}>Edit</Item>
                <Item onClick={() => deleteMessage(message)}>Delete</Item>
            </Menu>
        </>
    )
}

export default ChatMessage