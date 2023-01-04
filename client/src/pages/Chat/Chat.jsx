import "./chat.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import ChatBox from "../../components/Chats/ChatBox";
import Conversation from "../../components/conversation/Conversation";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:8800");

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [rooms, setRooms] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  useEffect(() => {
    socket.emit("add-new-user", user._id);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getChat = async () => {
      try {
        const { data } = await userChats();
        console.log(data ,'data');
        setRooms(data.chat);
      } catch (error) {
        console.log(error);
      }
    };
    getChat();
  }, [user]);

  //send message to socket server
  useEffect(() => {
    if (sendMessage) {
      socket.emit("sendMessage", sendMessage);
    }
  }, [sendMessage]);

  //receive message from socket server
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (room) => {
    const roomMember = room.members.find((member) => member !== user._id);
    const isOnline = onlineUsers.find((user) => user.userId === roomMember);

    // returning true or false based on member is inside the onlineUsers
    return isOnline ? true : false;
  };
  return (
    <>
      <div className="chat-navbar">
        
      </div>
      <div className="chat">

      <div className="right-side-chat">
          <div className="chat-notification"></div>

          {/* chat body */}
          <ChatBox
            room={currentRoom}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        </div>
        <div className="left-side-chat">
          <div className="chat-container">
            <h2>Conversations </h2> 
            <div className="chat-list">
              {rooms.map((room) => {
                return (
                  <div key={room._id} onClick={() => setCurrentRoom(room)}>
                    <Conversation
                      room={room}
                      isOnline={checkOnlineStatus(room)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default Chat;