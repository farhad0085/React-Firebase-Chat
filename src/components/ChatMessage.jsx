import React from 'react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";


function ChatMessage({ message, auth, deleteMessage }) {

    const { text, uid, photoURL } = message

    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

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
                <ContextMenuTrigger id={message.id}>
                    <p>{text}</p>
                </ContextMenuTrigger>
            </div>

            <ContextMenu className="contextMenu" id={message.id}>
                <MenuItem className="contextMenu item" onClick={() => deleteMessage(message)}>
                    Delete
                </MenuItem>
            </ContextMenu>
        </>
    )
}

export default ChatMessage