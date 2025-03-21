# Collaborative Coding & Video Call App

This project is a real-time collaborative coding and meeting application. It allows users to join meetings, edit code collaboratively using a shared code editor, participate in video calls, and exchange messages via a chat box.

---

## 🚀 Features

- **Real-time Collaborative Coding**: Users in the same meeting can view and edit the same code in real-time.
- **User Management**: Displays a list of users currently in the meeting.
- **Video Calls**: Integrated video call functionality.
- **Real-time Chat**: Users can send and receive messages instantly.
- **Code Syncing**: Ensures the latest version of code is shared across all meeting participants.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Monaco Editor
- **Backend**: Express, Socket.IO
- **WebSocket**: Real-time communication using Socket.IO

---

## 📂 Project Structure

### Client (`src`)
- `MeetingPage.jsx`: Main page where users join meetings and collaborate.
- `CodeEditor.jsx`: Code editor component using Monaco Editor.
- `VideoCall.jsx`: Placeholder for video call functionality.
- `ChatBox.jsx`: Chat box for real-time messaging.
- `UserList.jsx`: Displays the list of participants in the meeting.

### Server (`server.js`)
- Handles real-time communication, user management, code synchronization, and disconnection events.

---

## 🔧 Installation and Setup

### Prerequisites
- Node.js installed on your system.

### Steps
1. Clone the repository:
   ```bash
   
   git clone https://github.com/divyeshdhole/peerLink.git
   cd PeerLink
   cd client
   npm install
   cd server
   node index.js
   cd client
   npm run dev
Usage
Open the client at http://localhost:5173.
Enter a meeting code and your username to join or start a new meeting.
Share the meeting code with others to collaborate in real-time.
📦 Environment Variables
Ensure your environment is configured with the following variables:

FRONTEND_URL: URL of your frontend (e.g., http://localhost:5173).
SERVER_PORT: Port for the backend server (default: 3001).
🐛 Known Issues
 Video call feature placeholder (to be integrated).
 Chat may require additional enhancements.
👥 Contributors
Divyesh Dhole - Creator & Maintainer.
📄 License
This project is licensed under the MIT License.
