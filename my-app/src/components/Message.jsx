import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

import {useSelector, useDispatch} from 'react-redux'
import { setMessage } from "./messageSlice.js";
import { Link } from "react-router-dom";



const Message = ({ message }) => {
  const dispatch = useDispatch();
const messaget=useSelector((state)=>state.message.value);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    console.log(message.date)
    
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
    <Link to={`/Profile/${message.senderId}`}>
      <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        </Link>  
 
 <span>
 {message.date?.toDate().toLocaleTimeString()} 
 </span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
    
          


  );
};

export default Message;