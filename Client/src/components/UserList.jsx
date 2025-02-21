import React, { useEffect, useState } from "react";
import socket from "../socket";
const UserList = ({ username, meetingCode }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // Notify the server of the new user joining the specific meeting

        // Listen for updated user lists for this particular meeting
        socket.on("updateUsers", (userList) => {
            setUsers(userList);
        });

        // Cleanup the socket listener
        return () => socket.off("updateUsers");
    }, [username, meetingCode]);

    return (
        <div className="p-4 bg-gray-100 rounded-lg text-black">
            <h2 className="text-lg font-semibold">Connected Users in Meeting {meetingCode}:</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="py-1">
                        {user.name + " " + "user"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
