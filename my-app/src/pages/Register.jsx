import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div>
      <div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
<div className="snowflake"></div>
</div>

        <span className="logo">ART_CHAT</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Enter your name BRO'S"  
          maxLength={15}
          />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
        
          {img ? <img className="img_dow" src={URL.createObjectURL(img)}/>:
          <></>}
          <>
            <input required style={{ display: "none" }} type="file" id="file"
            accept=".jpg, .jpeg, .png"
          onChange={(e) => setImg(e.target.files[0])} />
          
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add your Avatar</span>
            
          </label></>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
        Do u have accout? <Link to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;