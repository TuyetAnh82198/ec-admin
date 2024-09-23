import io from "socket.io-client";
export const socket = io(process.env.REACT_APP_SERVER, {
  autoConnect: false,
  extraHeaders: {
    "Access-Control-Allow-Origin": process.env.REACT_APP_ADMIN,
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});
