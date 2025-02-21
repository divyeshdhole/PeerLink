import React, { useRef } from "react";

const VideoCall = () => {
    const videoRef = useRef(null);

    // Start local video stream
    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Error starting video stream", error);
        }
    };

    return (
        <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Video Call</h2>
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border border-gray-700" />
            <button
                onClick={startVideo}
                className="mt-4 bg-blue-500 px-4 py-2 rounded-lg font-semibold text-white"
            >
                Start Video
            </button>
        </div>
    );
};

export default VideoCall;
