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
  const [loginStatus,setLoginStatus]=useState('');

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
      if(response.data.message){
        setLoginStatus(response.data.message);
      }else{
        setLoginStatus(response.data.Email);
      }
    });
  };

  useEffect(()=>{
    Axios.get("http://localhost:3001/login").then(response=>{
      if(response.data.LoggedIn===true){
        setLoginStatus(response.data.user.Email);
      }
    })
  },[]);

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
      <div>{loginStatus}</div>
    </div>
  );
}

export default App;
