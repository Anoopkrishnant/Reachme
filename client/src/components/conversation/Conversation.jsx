import './Conversation.scss'
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../api/UserRequest";


const Conversation = ({ room, isOnline }) => {
  const [memberData, setMemberData] = useState({});

  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const memberId = room.members.find((id) => id !== user._id);
    
    const getUserData = async () => {
      const { data } = await getUserDetails(memberId);
      console.log(getUserDetails,'data');
      
      setMemberData(data);
    };
    getUserData();
  }, []);
 
  return (
    <>
      <div className="followers conversation">
        <div>
          {isOnline && <div className="online-dot"></div>}
          <img
            className="followerImg"
            src={memberData.profilePicture ? 
                process.env.REACT_APP_PUBLIC_FOLDER +
                 memberData.profilePicture : ""}
            alt=""
          />
          <div className="name">
            <span>
              {memberData?.username}
            </span>
            <span>{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Conversation;

