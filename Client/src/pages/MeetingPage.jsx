import React, { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import VideoCall from "../components/VideoCall";
import ChatBox from "../components/ChatBox";
import UserList from "../components/UserList";
import { useParams } from "react-router-dom";
import socket from "../socket"
const MeetingPage = ({ joined, setJoined }) => {
    const { meetingCode } = useParams(); // Retrieve meeting code from URL
    const [consoleOutput, setConsoleOutput] = useState("");
    const [users, setUsers] = useState([]);
    const userName = localStorage.getItem("userName"); // Get the userName from localStorage
    useEffect(() => {
        console.log("the meeting is :" + joined);
        if (!joined) {
            // Emit a join event when the component loads
            socket.emit("join", { userName, meetingCode });
            console.log("joined");
            // Listen for updates to the users list
            socket.on("updateUsers", (updatedUsers) => {
                setUsers(updatedUsers);
                setJoined(true);
            });

            // Cleanup listener when the component unmounts
            return () => {
                socket.off("updateUsers");
            };
        }
    }, [joined]);

    const handleRunCode = () => {
        // Placeholder logic for running code
        // console.log("the meeting is :" + joined);
        setConsoleOutput("Running code...");
    };

    return (
        <div className="flex flex-col min-h-screen text-white">
            {/* Header Section */}
            <header className="p-6 bg-gray-800 text-center shadow-lg">
                <h1 className="text-4xl font-extrabold mb-2">Meeting: {meetingCode}</h1>
                <p className="text-lg font-semibold">Meeting Code: {meetingCode}</p>
                <p className="text-lg font-semibold">Host: {userName}</p>
            </header>

            {/* Main Section */}
            <div className="flex flex-1 overflow-hidden bg-gray-900 p-4 rounded-lg mx-4 mt-6 flex-col md:flex-row space-y-4 md:space-y-0">
                {/* Left: Video Call and Chat Section */}
                <div className="w-full md:w-1/3 bg-gray-800 p-4 rounded-lg shadow-lg flex-shrink-0 flex flex-col space-y-4">
                    {/* Video Call */}
                    <div className="flex-1 bg-gray-800 rounded-lg shadow-lg">
                        <VideoCall />
                    </div>

                    {/* User List */}
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Users in Meeting</h3>
                        <UserList users={users} />
                    </div>

                    {/* Chat Section */}
                    <div className="h-1/4 overflow-auto bg-gray-800 p-4 rounded-lg shadow-lg">
                        <ChatBox />
                    </div>
                </div>

                {/* Right: Code Editor and Console */}
                <div className="w-full md:w-2/3 flex flex-col ml-0 md:ml-4 space-y-4">
                    {/* Code Editor */}
                    <div className="flex-1 border-b border-gray-700 overflow-auto bg-gray-800 rounded-lg shadow-lg mb-4">
                        <CodeEditor meetingCode={meetingCode} />
                    </div>

                    {/* Button to run code */}
                    <div className="flex justify-between mb-4">
                        <button
                            onClick={handleRunCode}
                            className="px-4 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600"
                        >
                            Run Code
                        </button>
                    </div>

                    {/* Console Output */}
                    <div className="h-1/4 bg-gray-800 p-4 rounded-lg shadow-lg overflow-auto">
                        <h3 className="text-xl font-semibold mb-2">Console Output</h3>
                        <pre className="text-white">{consoleOutput}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingPage;
