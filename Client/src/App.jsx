import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MeetingCreate from './pages/MeetingCreate';
import MeetingPage from './pages/MeetingPage';
import { useState } from 'react';
import './App.css';

const App = () => {

  const [joined, setJoined] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MeetingCreate setJoined={setJoined} />} />
        <Route path="/meeting/:meetingCode" element={<MeetingPage joined={joined} setJoined={setJoined} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
