import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./register.scss"
import {useDispatch} from 'react-redux'
import { signUp } from '../../redux/actions/AuthAction'

const Register = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({
     username: "",
     email: "",
     password: "", 
     confirmpass: "",
    });
  const [confirmPass, setConfirmPass] = useState(true)
  const handleChange = (e)=> {
    setData({...data, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    data.password === data.confirmpass 
    ? dispatch(signUp(data)) 
    : setConfirmPass(false)
  } 
 

  return (
      <div className="register"> 
      <div className="card">
      <div className="left">
        <h1> Reach<span style={{color:"#14da8f"}}> Me </span></h1>
      
     
        <p>
          Know more about <strong>Reach Me</strong> you need to signup and explore!
          Keeping up with friends is faster and easier than ever. Share photos and viedos
          send messages and get Updated.
           
           
        </p>
        <span> Do You have An account?</span>
        <Link to="/login" >
        <button> Login</button>
        </Link>
      </div>
      <div className="right">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} >
            <div className="input-bx">
            <input type="text" required name='username' onChange={handleChange} value={data.username}/>
            <span>Name</span>
            </div>
            <div className="input-bx">
            <input type="email" required name='email' onChange={handleChange} value={data.email}  />
            <span>Email</span>
            </div>
            <div className="input-bx">
            <input type="password" required name='password' onChange={handleChange} value={data.password} />
            <span>Password</span>
            </div>
            <div className="input-bx">
            <input type="password" required name='confirmpass' onChange={handleChange} value={data.confirmpass} />
            <span>Re-password</span>
            </div>
            <span style={{display: confirmPass? "none": "block", color: 'red', fontSize: '12px', marginBottom:"40px"}}>
              *Password is not same
            </span>
            <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Register
