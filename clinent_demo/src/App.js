import {useEffect, useState} from'react';
import Axios from 'axios';
import './App.css';

function App() {

  Axios.defaults.withCredentials=true;
 

  //Sign-up - state
  const [userName,setUserName]=useState('');
  const [password,setPassword]=useState('');

  //Login - state
  const [userNameLogin,setUserNameLogin]=useState('');
  const [passwordLogin,setPasswordLogin]=useState('');

  //Login status
  const [loginStatus,setLoginStatus]=useState(false);

  //LOGIN DETAILES
  const [message,setMessage]=useState('');
  //Login
  const userNameHandlerReg=(event)=>{
    setUserName(event.target.value);
  }
  const passwordHandlerReg=(event)=>{
    setPassword(event.target.value);
  }
  const Register=()=>{
    Axios.post('http://localhost:3001/register',{
    user:userName,
    pass:password
    }).then((response)=>{
      console.log(response);
    });
  };

  const userNameHandler=(event)=>{
    setUserNameLogin(event.target.value);
  }

  const passwordHandler=(event)=>{
    setPasswordLogin(event.target.value);
  }
  const Login=()=>{
    Axios.post('http://localhost:3001/login',{
    user:userNameLogin,
    pass:passwordLogin
    }).then((response)=>{
      if(!response.data.auth){
        console.log(response.data);
        setLoginStatus(false);
        setMessage(response.data.message);
      }else{
        setLoginStatus(true);
        console.log(response.data); 
        localStorage.setItem("token",response.data.token);
        setMessage(response.data.user_find.Email)
      }
    });
  };

  useEffect(()=>{
    Axios.get("http://localhost:3001/login").then(response=>{
      if(response.data.LoggedIn===true){
        setLoginStatus(true);
      }
    })
  },[]);

  const userAuth=()=>{
    Axios.get("http://localhost:3001/isUserAuth",{
      headers:{
        "x-access-token":localStorage.getItem("token")
      }
    }).then(response=>{
      console.log(response);
    })
  }

  return (
    <div className="App">
      <h1>Registration</h1>
      <label>Username</label>
      <input type="email" onChange={userNameHandlerReg}/>
      <label>Password</label>
      <input type="text" onChange={passwordHandlerReg}/>
      <button onClick={Register}>Register</button>

      <h1>Login</h1>
      <label>Username</label>
      <input type="email" onChange={userNameHandler}/>
      <label>Password</label>
      <input type="text" onChange={passwordHandler}/>
      <button onClick={Login}>Login</button>
      <div>{message}</div>
      {loginStatus&&(
        <button onClick={userAuth}>Authenticated</button>
      )}
    </div>
  );
}

export default App;
