import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Initialize socket connection outside the component to ensure only one connection
import socket from "../socket";


const MeetingCreate = ({ setJoined }) => {
    const [meetingName, setMeetingName] = useState(""); // State to store meeting name
    const [meetingCode, setMeetingCode] = useState("");
    const [existingMeetingCode, setExistingMeetingCode] = useState("");
    const [userName, setUserName] = useState(""); // User's name state

    const navigate = useNavigate();

    // Generate a random meeting code
    const generateMeetingCode = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let code = "";
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };

    // Handle creating a new meeting
    const handleCreateMeeting = () => {
        if (!meetingName || !userName) {
            alert("Please enter both meeting name and your name.");
            return;
        }
        const generatedCode = generateMeetingCode();
        setMeetingCode(generatedCode);
        localStorage.setItem("userName", userName);
        localStorage.setItem("meetingCode", existingMeetingCode);
        // Emit user info to the server to create a new meeting
        setJoined(true);
        console.log(userName);
        // Emit user info to the server to join the meeting
        socket.emit("join", { userName, meetingCode: generatedCode });

        // Redirect to the meeting page using the generated meeting code
        navigate(`/meeting/${generatedCode}`);
    };

    // Handle joining an existing meeting
    const handleJoinMeeting = () => {
        if (!existingMeetingCode || !userName) {
            alert("Please enter a valid meeting code and your name.");
            return;
        }

        localStorage.setItem("userName", userName);
        localStorage.setItem("meetingCode", existingMeetingCode);

        // Ensure socket is connected before emitting the event
        if (socket && socket.connected) {
            console.log("Emitting join event");
            setJoined(true);
            socket.emit("join", { userName, meetingCode: existingMeetingCode });
        } else {
            console.error("Socket not connected");
        }
        navigate(`/meeting/${existingMeetingCode}`);
    };

    // Set up socket listeners on component mount
    useEffect(() => {
        // Ensure the socket connects only once
        // socket.connect();
        console.log("connected")
        // Clean up socket on component unmount

    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    Collaborative Meeting
                </h1>

                {/* User Name Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Enter Your Name</h2>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full p-3 border rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                {/* Create Meeting Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Create a New Meeting</h2>
                    <input
                        type="text"
                        placeholder="Enter meeting name"
                        className="w-full p-3 border rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={meetingName}
                        onChange={(e) => setMeetingName(e.target.value)} // Handle meeting name input
                    />
                    <button
                        onClick={handleCreateMeeting}
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Create Meeting
                    </button>

                    {/* Display Meeting Code */}
                    {meetingCode && (
                        <div className="mt-6 p-4 bg-gray-100 border rounded-lg text-gray-800">
                            <p>
                                <strong>User Name:</strong> {userName}
                            </p>
                            <p>
                                <strong>Meeting Code:</strong> {meetingCode}
                            </p>
                        </div>
                    )}
                </div>

                {/* Join Meeting Section */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Join an Existing Meeting</h2>
                    <input
                        type="text"
                        placeholder="Enter meeting code"
                        className="w-full p-3 border rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={existingMeetingCode}
                        onChange={(e) => setExistingMeetingCode(e.target.value)}
                    />
                    <button
                        onClick={handleJoinMeeting}
                        className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                        Join Meeting
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MeetingCreate;
