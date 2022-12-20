import { useState } from "react"
import Game_1 from "./Game_1"
import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import Cam from "../img/cam.svg";
import { ChatContext } from "../context/ChatContext";
import Add from "../img/add.svg";
import More from "../img/more.svg";


const NavbarMain = ()=>{
    const[state,setState] = useState(false);
    const {currentUser} = useContext(AuthContext)
    const { data } = useContext(ChatContext);
    return(
        <div className="main_navbar">
     <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span className="ProfileName">{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    <div className="chatInfo">
   
        <span className="UserName">{data.user?.displayName}</span>
      
        {state && <Game_1/>}
        <div className="chatIcons">
      
       <img src={Cam} alt=""
       onClick={()=>setState(!state)} />
          <a href="https://www.vk.com">
          <img src={Add} alt="" /></a>
          <a href="https://www.facebook.com"><img src={More} alt="" /></a>
          
        </div>
      </div>

        </div>
    )
}
export default NavbarMain