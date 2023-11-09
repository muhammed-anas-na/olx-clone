import React, { useState,useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import {useNavigate,Link} from 'react-router-dom'

export default function Signup() {
  const [data,setData] = useState({username:'',email:'',phone:'',password:''})
  const {firebase} =  useContext(FirebaseContext)
  const navigate = useNavigate();
  function handleSubmit(e){
    e.preventDefault()
    console.log(firebase);
    firebase.auth().createUserWithEmailAndPassword(data.email , data.password).then((result)=>{
      result.user.updateProfile({displayName:data.username}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:data.username,
          phone:data.phone
        }).then(()=>{
          navigate('/login')
        })
      })
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={data.username}
            onChange={(e)=>setData({...data , username:e.target.value})}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={data.email}
            onChange={(e)=>setData({...data , email:e.target.value})}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={data.phone}
            onChange={(e)=>setData({...data , phone:e.target.value})}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={data.password}
            onChange={(e)=>setData({...data , password:e.target.value})}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
