import {useState} from'react';
import Axios from 'axios';
import './App.css';

function App() {
  //Sign-up
  const [userName,setUserName]=useState('');
  const [password,setPassword]=useState('');

  //Login
  const [userNameLogin,setUserNameLogin]=useState('');
  const [passwordLogin,setPasswordLogin]=useState('');

  const userNameHandlerLogin=(event)=>{
    setUserName(event.target.value);
  }

  const passwordHandlerLogin=(event)=>{
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
      console.log(response);
    });
  };
  return (
    <div className="App">
      <h1>Registration</h1>
      <label>Username</label>
      <input type="email" onChange={userNameHandlerLogin}/>
      <label>Password</label>
      <input type="text" onChange={passwordHandlerLogin}/>
      <button onClick={Register}>Register</button>

      <h1>Login</h1>
      <label>Username</label>
      <input type="email" onChange={userNameHandler}/>
      <label>Password</label>
      <input type="text" onChange={passwordHandler}/>
      <button onClick={Login}>Login</button>
    </div>
  );
}

export default App;
