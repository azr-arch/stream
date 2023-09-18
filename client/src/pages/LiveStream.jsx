import React, { useRef, useEffect, useState } from "react";
import Overlay from "../component/Overlay";
import { Form, Link, redirect } from "react-router-dom";
import { Socket, io } from "socket.io-client";

const LiveStream = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streamType, setStreamType] = useState("None");
  const [key, setKey] = useState("");
  const [preview, setPreview] = useState(false);

  const startVideo = async (type) => {
    let stream;

    if (!key) {
      alert("please provide stream key");
      return;
    }

    if (type === "webcam") {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
    } else if (type === "screen") {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
    } else {
      alert("no suitable options selected");
      setTitle("");
    }

    //sending the STREAM KEY to server here
    const res = await fetch("http://localhost:8080/start-stream", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ key }),
    });

    if (res.status !== 201) {
      console.log("error occured", res);
      return;
    }

    videoRef.current.srcObject = stream;

    let socket = io("http://localhost:8080", {
      transports: ["websocket"],
    });

    const options = { mimeType: "video/webm ; codecs=vp9" };
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = (e) => {
      let reader = new FileReader();
      reader.onloadend = function () {
        // console.log("reader result : " + reader.result);
        socket.emit("stream", reader.result);
      };

      reader.readAsArrayBuffer(e.data);
      // console.log("reading array buffer of :" + e.data);
    };

    mediaRecorder.start(500);
    try {
      await new Promise((resolve) => (videoRef.current.onCanPlay = resolve));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="w-full  flex flex-col items-start justify-center pb-4">
      <h1 className="text-2xl text-center text-[] mb-4">Live Stream</h1>
      <Link to={".."} className="text-white bg-primary rounded-sm px-5 py-1">
        Back
      </Link>
      <form className="w-full self-center flex flex-col gap-4 max-w-md space-y-4 p-5">
        {/* will implement to add title after some twitch api reading */}
        {/* <label className="block">
          <span className="text-white">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 mt-1 block w-full rounded-md bg-[#18181b] border border-primary text-text p-2"
          />
        </label> */}
        <label className="block">
          <span className="text-white">Stream key (primary)</span>
          <input
            type="text"
            placeholder="primary stream key"
            value={key}
            className="px-4 mt-1 block w-full rounded-md bg-[#18181b] border border-primary text-text p-2"
            onChange={(e) => setKey(e.target.value)}
          />

          <p className="text-text font-medium text-xs m-2 ">
            You can get the key here :
            https://dashboard.twitch.tv/u/&lt;YOUR_TWITCH_USERNAME&gt;/settings/stream
          </p>
          <span className="text-text font-medium text-xs mt-2">
            Note: I value your privacy and take data security seriously. When
            you enter your private stream key, please be assured that it is used
            solely for the purpose of establishing the streaming connection. I
            do not store, share, or use your key for any other purposes. This
            project`s repository is public, meaning you can review the source
            code at any time to understand how your data is handled.
          </span>
        </label>
        <label className="block">
          <span className="text-white">Stream Type:</span>
          <select
            value={streamType}
            onChange={(e) => {
              setStreamType(e.target.value);
            }}
            className="px-3 selec mt-1 block w-full rounded-md bg-[#18181b] border border-primary text-text p-2"
          >
            <option value="none">None</option>

            <option value="webcam">Webcam</option>
            <option value="screen">Screen</option>
          </select>
        </label>
      </form>
      <h1 className="text-text text-lg">preview will be shown here</h1>
      <div className="relative p-4 w-full aspect-video mt-4 ">
        <video ref={videoRef} playsInline autoPlay />

        {/* <button className=" absolute top-4 left-4 px-4 py-1 rounded-sm bg-primary text-white">
          Add Overlay
        </button> */}
      </div>
      <button
        onClick={() => startVideo(streamType)}
        className="bg-primary text-white rounded px-4 py-2 mt-8"
      >
        Start Live Streaming
      </button>

      <span className="text-text text-sm ">
        To stop the stream just refresh the page!
        <span>stream may take 20-30 seconds to show on twitch</span>
      </span>
    </main>
  );
};
export default LiveStream;
