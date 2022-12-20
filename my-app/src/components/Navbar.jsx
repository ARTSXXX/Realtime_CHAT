import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
const Navbar = ({CloseFind}) => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className="user">
      <Link to={`/Profile/${currentUser.uid}`}><img src={currentUser.photoURL} alt="" />
        <span className="ProfileName">{currentUser.displayName}</span></Link>
        <button className='log' onClick={()=>signOut(auth)}>Logout</button>
        <button className='close' onClick={()=>CloseFind(false)}>x</button>
      </div>
    </div>
  )
}

export default Navbar