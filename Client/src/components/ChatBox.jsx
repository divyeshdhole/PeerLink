import React, { useState, useEffect } from "react";

import socket from "../socket";


const ChatBox = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        // Listen for incoming messages
        socket.on("receiveMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => socket.off("receiveMessage");
    }, []);

    const sendMessage = () => {
        socket.emit("sendMessage", message);
        setMessage("");
    };

    return (
        <div className="p-4 bg-gray-700 rounded-lg text-black">
            <h2 className="text-lg font-semibold">Chat</h2>
            <div className="h-40 overflow-y-scroll bg-white p-2 border rounded ">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-2 mt-2 border text-black rounded"
            />
            <button
                onClick={sendMessage}
                className="px-4 py-2 mt-2 text-black bg-blue-500 rounded"
            >
                Send
            </button>
        </div>
    );
};

export default ChatBox;
