# StreamYard Clone Prototype

This project is a prototype version of a StreamYard clone. It's a simple yet powerful tool that allows you to stream your webcam video to Twitch.

## Features

- **Webcam Streaming**: The application can capture video from your webcam and stream it to Twitch in real time.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository: `git clone https://github.com/yourusername/streamyard-clone.git`
2. Navigate into the project directory: `cd streamyard-clone`
3. Install ffmpeg for your system from https://ffmpeg.org/

#### Server

3. Navigate into the server directory: `cd server`
4. Install the server dependencies: `npm install`
5. Start the server: `npm start`

#### Client

6. In a new terminal window, navigate into the client directory: `cd client`
7. Install the client dependencies: `npm install`
8. Start the client: `npm start`

## Usage

To start the application, run `npm start` in both the server and client directories. This will start the server and open the application in your default web browser.

When you're ready to start streaming, enter your Twitch stream key into the input field and click "Start Live Streaming". The application will then start capturing video from your webcam and streaming it to Twitch.

## Future Improvements

This is just a prototype version of the application, so it currently only supports streaming from your webcam to Twitch. In future versions, I plan to add more features such as:

- Different platforms
- Screen sharing
- Multiple participants
- Chat integration
- And much more!

## License

This project is licensed under the MIT License.

## Disclaimer

This project is not affiliated with, sponsored by, or endorsed by StreamYard or Twitch.
