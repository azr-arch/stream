import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import child_process from "child_process";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = createServer(app);
const io = new Server(server);

app.post("/start-stream", (req, res) => {
  const key = req.body.key;

  if (!key) {
    return res
      .status(500)
      .json({ error: true, message: "no key was provided" });
  }

  // Start FFmpeg with the received key
  const ffmpeg = child_process.spawn("ffmpeg", [
    "-i",
    "-", // Input from stdin
    "-c:v",
    "libx264", // Video codec
    "-c:a",
    "aac", // Audio codec
    "-f",
    "flv", // Output format
    `rtmp://del01.contribute.live-video.net/app/${key}`,
  ]);

  ffmpeg.stdout.on("data", (data) => {
    console.log("FFmpeg Standard Output: ", data.toString());
  });

  ffmpeg.stderr.on("data", (data) => {
    console.log("FFmpeg Standard Error: ", data.toString());
  });

  ffmpeg.on("error", (error) => {
    console.log("An error occurred while launching FFmpeg", error.message);
  });

  ffmpeg.on("exit", (code, signal) => {
    if (code !== null) {
      console.log(`FFmpeg exited with code ${code}`);
    }

    if (signal !== null) {
      console.log(`FFmpeg was killed with signal ${signal}`);
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected : ", socket.id);

    // using sockets to send stream
    socket.on("stream", (data) => {
      console.log("Received stream data");
      ffmpeg.stdin.write(data);
    });
  });

  io.on("connect_error", (error) => {
    console.log(error);
  });

  res.status(201).json({ status: "ok" });
});

server.listen(8080, () => {
  console.log(" server running on http://localhost:8080");
});
