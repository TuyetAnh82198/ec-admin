import {
  Grid,
  Box,
  Chip,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";

import { SOCKET, COLOR, PAGE_PATH } from "../../utils/constants";
import { socket } from "../../socket";
import fetchLogin from "../../utils/fetchLogin";

const Chat = () => {
  const [messageList, setMessageList] = useState([]);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetchLogin()
      .then((loggedInState) => {
        setIsLoggedIn(loggedInState);
      })
      .catch((err) => {
        navigate(PAGE_PATH.LOGIN);
      });
  }, []);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (input.trim().length !== 0) {
      const index = rooms.findIndex((item) => item.roomId === roomId);

      const handleNewMessage = (input) => {
        const current = new Date();
        const newMessage = {};
        newMessage[SOCKET.CHAT.INFOR.SENDER] = SOCKET.CHAT.SENDER.ADMIN;
        newMessage[SOCKET.CHAT.INFOR.DATE_TIME] = `${
          current.getMonth() + 1
        }/${current.getDate()} ${current.getHours()}:${current.getMinutes()}`;
        newMessage[SOCKET.CHAT.INFOR.CONTENT] = input;
        return newMessage;
      };
      const newMessage = handleNewMessage(input);

      rooms[index].messageList = [...rooms[index].messageList, newMessage];
      setRooms(rooms);
      const sendMessages = () => {
        return {
          roomId: rooms[index].roomId,
          messageList: rooms[index].messageList,
        };
      };
      socket.emit(SOCKET.CHAT.SEND.EMIT, sendMessages());
      setInput("");
    }
  };

  useEffect(() => {
    socket.on(SOCKET.CHAT.ERROR, (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    const getRoomId = (id) => {
      socket.emit(SOCKET.CHAT.JOIN_ROOM, id);
    };
    socket.on(SOCKET.CHAT.ROOM_CREATED, getRoomId);
    const receiveMessages = (data) => {
      let index = rooms.findIndex((item) => item.roomId === data.roomId);
      if (index >= 0) {
        rooms[index].messageList = data.messageList;
      } else {
        rooms.push({
          roomId: data.roomId,
          messageList: data.messageList,
        });
      }
      setRooms(rooms);
      localStorage.setItem(SOCKET.CHAT.ROOMS, JSON.stringify(rooms));
      setRoomId(data.roomId);
      setMessageList(data.messageList);
    };
    socket.on(SOCKET.CHAT.RECEIVE.FROM_SERVER, receiveMessages);
    const getIdToEndChat = (id) => {
      const index = rooms.findIndex((item) => item.roomId === id);
      rooms.splice(index, 1);
      setRooms(rooms);
      localStorage.setItem(SOCKET.CHAT.ROOMS, JSON.stringify(rooms));
      setRoomId("");
      setMessageList([]);
    };
    socket.on(SOCKET.CHAT.RECEIVE.END_CHAT, getIdToEndChat);
    return () => {
      socket.off(SOCKET.CHAT.ROOM_CREATED, getRoomId);
      socket.off(SOCKET.CHAT.RECEIVE.FROM_SERVER, receiveMessages);
      socket.off(SOCKET.CHAT.RECEIVE.END_CHAT, getIdToEndChat);
    };
  }, []);

  const handleSwitchRoom = (room) => {
    setRoomId(room.roomId);
    setMessageList(room.messageList);
  };

  const handleInput = (e) => setInput(e.target.value);

  const chatList = () => {
    return (
      <Stack
        sx={{ padding: { xs: "0.5rem", md: "1rem" } }}
        direction="column"
        spacing={1}
      >
        {localStorage.getItem(SOCKET.CHAT.ROOMS) &&
          JSON.parse(localStorage.getItem(SOCKET.CHAT.ROOMS)).map((room) => (
            <Chip
              size="small"
              sx={{
                backgroundColor: "#ffcbcb",
              }}
              key={room.roomId}
              icon={
                <PersonIcon
                  style={{
                    fontSize: "1rem",
                    color: COLOR.PINK,
                  }}
                />
              }
              label={room.roomId}
              onClick={() => handleSwitchRoom(room)}
            />
          ))}
      </Stack>
    );
  };

  const chatBox = () => {
    return (
      <ScrollToBottom>
        <Box sx={{ padding: "1rem", minHeight: "75vh" }}>
          {messageList.map((msg) => (
            <Box
              key={(Math.random() * 5).toString()}
              sx={{
                textAlign:
                  msg.sender === SOCKET.CHAT.SENDER.ADMIN ? "right" : "left",
                color:
                  msg.sender === SOCKET.CHAT.SENDER.ADMIN ? "white" : "gray",
              }}
            >
              <Box>
                {msg.sender === SOCKET.CHAT.SENDER.CLIENT && (
                  <PersonIcon
                    style={{ color: COLOR.PINK, fontSize: "1.4rem" }}
                  />
                )}
                <p
                  style={{
                    display: "inline-block",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor:
                      msg.sender === SOCKET.CHAT.SENDER.ADMIN
                        ? COLOR.PINK
                        : COLOR.LIGHT_GRAY,
                  }}
                >
                  {msg.content}
                </p>
              </Box>
              <p style={{ color: "gray" }}>
                <span>{msg.dateTime}</span> from {msg.sender}
              </p>
            </Box>
          ))}
        </Box>
      </ScrollToBottom>
    );
  };

  const formChat = () => {
    return (
      <>
        <hr />
        <form style={{ padding: "0.5rem" }} onSubmit={submitForm}>
          <TextField
            fullWidth
            value={input}
            onChange={handleInput}
            type="text"
            placeholder="Reply..."
            inputProps={{
              style: {
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                height: "5rem",
              },
            }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <button
                    type="submit"
                    style={{ backgroundColor: "white", border: "none" }}
                  >
                    <SendIcon
                      sx={{
                        color: COLOR.PINK,
                        cursor: "pointer",
                        fontSize: "large",
                      }}
                    />
                  </button>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </>
    );
  };

  return (
    <>
      {isLoggedIn && (
        <Grid container>
          <Grid
            sx={{
              minHeight: "100vh",
              borderRight: "solid 1px #cccccc",
            }}
            item
            xs={3}
            lg={2}
          >
            {chatList()}
          </Grid>
          <Grid item xs={9} lg={10}>
            <Box>
              {chatBox()}
              {formChat()}
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Chat;
