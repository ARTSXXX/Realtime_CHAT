import React, { useContext } from "react";
import Cam from "../img/cam.svg";
import Add from "../img/add.svg";
import More from "../img/more.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import Register from '../pages/Register'
import Game_1 from "./Game_1";
import { useState } from "react";
import { useEffect } from "react";

const Chat = ({GetFind,states}) => {
const [isOpened, setIsOpened] = useState(false);
  const { data } = useContext(ChatContext);
const[state,setState] = useState(false);
const Find = ()=>{
  setIsOpened(true)
  GetFind(true)
}
useEffect(()=>{
  setIsOpened(states)
},[states])
  return (
    <div className="chat">
      
      <div className="chatInfo">
      <button className="find" onClick={Find}>
        Find
      </button>
        <span className="UserName">{data.user?.displayName}</span>
        {state && <Game_1/>}
        <div className="chatIcons">
       
       <img src={Cam} alt=""
       onClick={()=>setState(!state)} />
          {/* <a href="https://www.vk.com">
          <img src={Add} alt="" /></a>
          <a href="https://www.facebook.com"><img src={More} alt="" /></a>
           */}
        </div>
      </div>
      <Messages />
      <Input/>
      
    
    </div>
  );
};

export default Chat;