import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";

import socket from "../socket";


const CodeEditor = ({ meetingCode }) => {
    const [code, setCode] = useState("// Start coding here..." + meetingCode);
    useEffect(() => {
        // Listen for code updates from other users
        socket.on("codeUpdate", (newCode) => {
            console.log(newCode.code);
            setCode(newCode.code);
        });

        // Cleanup the socket listener
        return () => socket?.off("codeUpdate");
    }, []);

    const handleEditorChange = (newCode) => {
        setCode(newCode);
        socket.emit("codeChange", { meetingCode: meetingCode, code: newCode }); // Replace with actual meeting code
    };

    return (
        <div className="h-full bg-gray-800">
            <MonacoEditor
                width="100%"
                height="100%"
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
                options={{ fontSize: 14, minimap: { enabled: false } }}
            />
        </div>
    );
};

export default CodeEditor;
