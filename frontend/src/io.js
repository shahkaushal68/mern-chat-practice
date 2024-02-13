import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:5050"

let socket = io(ENDPOINT);

export default socket;