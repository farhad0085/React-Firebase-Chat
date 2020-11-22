// import React, { useEffect, useRef, useState } from "react";
import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";


function ChatRoom({ firestore, auth, firebase }) {
    const lastMessageRef = useRef();


    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt", "desc").limit(50);

    const [messages] = useCollectionData(query, { idField: "id" })


    const [formValue, setFormValue] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
        });
        setFormValue("");

        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    };

    // useEffect(() => {
    //     // console.log("use effect called");
    //     lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    // }, [messages])


    return (
        <>
            <main>
                {messages &&
                    messages.reverse().map((msg) => (
                        <ChatMessage key={msg.id} message={msg} auth={auth} />
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