import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useState } from 'react';
import Profile from './Profile';

const Home = () => {
  const [state,setState]= useState(false);
  const GetFind =(states)=>{
    setState(states)

   
  }
  const CloseFind = (states)=>{
    setState(states)
  }
  return (
    <div className='home'>
      <div className="container">
      <Sidebar state={state} CloseFind={CloseFind}/>
      <Chat GetFind={GetFind} states={state} />
     
      </div>
    </div>
  )
}

export default Home