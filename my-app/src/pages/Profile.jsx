
import React, { useContext, useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'
import { Link, useParams } from 'react-router-dom'
function Profile() {

    const [img,setImg] = useState();
    const [mainPhoto,setMainPhoto] = useState();
    const [boolName,SetBoolName] = useState(false);
    const [name,setName] = useState();
    const [boolEmail,SetBoolEmail] = useState(false);
    const [email,setEmail] = useState();
    const [loading,setLoading] = useState(false);
    const {currentUser} = useContext(AuthContext)
    
    const {id} = useParams();


  useEffect(() => {
    const GetUser = async () => { 
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setName(docSnap.data().displayName)
            setEmail(docSnap.data().email)
            setMainPhoto(docSnap.data().photoURL)
        

          
            
             
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    GetUser()
    }, [id])
    
 const  ChangeName  = async  () => {
SetBoolName(false)
//update firebase name 
try {
    async function updateName() {
        await updateProfile(currentUser, {
            displayName: name,
        });
    }
    updateName()
    //update firestore name
    const docRef = doc(db, "users", currentUser.uid);
    await setDoc(docRef, {
        displayName: name,
    }, { merge: true });
  
    setName(currentUser.displayName)
            

}
catch(err){
    console.log(err)
}

    }

    const SavePhoto = async () => {
        setImg(null)
         setLoading(false)
        const date = new Date().getTime();
        const storageRef = ref(storage, `${currentUser.displayName + date}`);
        await uploadBytesResumable(storageRef, img).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    setLoading(false)
                    //Update profile
                    await updateProfile(currentUser, {
                        photoURL: downloadURL,
                    });
                    setLoading(true)
                setMainPhoto(currentUser?.photoURL)

                    
                } catch (err) {
                    console.log(err);
                }

            });
        });

    }
useEffect(()=>{
    setMainPhoto(currentUser.photoURL)
    setLoading(true)
},[])

       



useEffect(()=>{
    setName(currentUser.displayName)
},[boolName])
useEffect(()=>{
    setEmail(currentUser.email)
},[boolEmail])

  return (
    <div className='home'>
    <div className="container">
    <div className="wrapper_profile">
        <div className="back">
            <Link to="/">
            Home
                </Link>


        </div>
         <div className="img_pro">

            {
                !loading ? <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
               : <img src={mainPhoto} alt="" />

            }
           
      <div className="button">

      {img ? <>
                <img className="img_dow" src={URL.createObjectURL(img)}/>
            <div className="buttons">
            <button className='cansel' onClick={()=>setImg(null)}>
                    Cansel
                </button>
                <button onClick={SavePhoto}>
                    Save
                </button>

            </div>
                </>:
                
          <><input required style={{ display: "none" }} type="file" id="file"
          accept=".jpg, .jpeg, .png"
        onChange={(e) => setImg(e.target.files[0])} />
        {
            currentUser.uid === id &&
            <>
            <label htmlFor="file">
        
        <span>Add your Avatar</span>

      </label></>

        }
         </>}
                

          </div>


           
         </div>
         <div className="inforamation_profile">
            <h1 className="title_profile">
                Your Profile
            </h1>
            <div className="block_profile_info">
                <div className="block">
                <h2>
                    Имя : 
                </h2>
                <h2 className="name">
                    {boolName ? <input type="text"
                    value={name}
                     className="input_name" onChange={(e)=>setName(e.target.value)} /> : name
                    }
                </h2>
               {boolName ? <>
                <button className="change_"
               onClick={ChangeName}
                >
                    Save
                </button>
            <button className='change_cansel' onClick={()=>SetBoolName(false)}>
                Cancel
            </button>
               
               </> :<>
               { currentUser.uid === id &&
                <button className="change_"
                onClick={()=>SetBoolName(true)}
                >
                    
                    Change
                </button>}
               </> }
                 
                 
                </div>
                <div className="block">
                <h2>
                    Email : 
                </h2>
                <h2 className="name">
                    {boolEmail ? <input type="text" 
                    value={email}
                    className="input_name" onChange={(e)=>setEmail(e.target.value)} /> : email
                    }
                </h2>
              

                </div>

            </div>
         </div>
    </div>
    </div>
    </div>
  )
}

export default Profile

