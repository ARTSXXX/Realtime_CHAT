import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import { useState } from "react";

const Sidebar = ({state,CloseFind}) => {
  
  
  

  return (
    <div className={ state? "sidebar active" : "sidebar"}>
      <Navbar CloseFind={CloseFind}/>
      <Search />
      <Chats CloseFind={CloseFind}/>
    </div>
  );
};

export default Sidebar;