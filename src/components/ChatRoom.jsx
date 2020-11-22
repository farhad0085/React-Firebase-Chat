import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";


function ChatRoom({ firestore, auth, firebase }) {
    const lastMessageRef = useRef();


    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt")

    const [messages] = useCollectionData(query, { idField: "id" })


    const [formValue, setFormValue] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;
        setFormValue("");

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
        });

        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const deleteMessage = async (message) => {

        if (message.uid === auth.currentUser.uid) {
            try{
            await messagesRef.doc(message.id).delete();
            }
            catch{
                alert("Error deleting message!")
            }
        }

        else {
            alert("You can't perform this action")
        }

    };

    useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages])


    return (
        <>
            <main>
                {messages &&
                    messages.map((msg) => (
                        <ChatMessage deleteMessage={deleteMessage} key={msg.id} message={msg} auth={auth} />
                    ))}

                <span ref={lastMessageRef}></span>
            </main>

            <form onSubmit={sendMessage}>
                <input
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="Type message..."
                />

                <button className="sendMessage" type="submit" disabled={!formValue}>
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
            </form>
        </>
    );
}

export default ChatRoom