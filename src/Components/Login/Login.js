import React,{useState , useContext} from 'react';
import { FirebaseContext } from '../../store/Context';
import { useNavigate,Link } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [Logindata,setLoginData] = useState({email:'' , password:''})
  const {firebase} = useContext(FirebaseContext);
  const navigate = useNavigate();
  function handleLogin(e){
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(Logindata.email,Logindata.password).then(()=>{
      navigate('/')
    }).catch((err)=>{
      alert(err.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={Logindata.email}
            onChange={(e)=>{setLoginData({...Logindata , email:e.target.value})}}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={Logindata.password}
            onChange={(e)=>{setLoginData({...Logindata , password:e.target.value})}}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
