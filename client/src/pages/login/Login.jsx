import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./login.scss"
import { logIn } from '../../redux/actions/AuthAction'
import { useDispatch, useSelector} from 'react-redux'
const Login = () => {
  const dispatch = useDispatch()
  const {loading} = useSelector((state) => state.authReducer)
  console.log(loading);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(logIn(data))

  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1> Reach<br /><span style={{ color: "#14da8f" }}>Me</span></h1>


          <p>
            Know more about <strong>Reach Me</strong> you need to signup and explore!
            Keeping up with friends is faster and easier than ever. Share photos and vedios
            send messages and get Updated.Connect with friends, family and find new people


          </p>
          <span> Don't You have An account?</span>
          <Link to="/register" >
            <button> Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} >
            <div className='input-bx'>
              <input type="text" required name='email' onChange={handleChange} value={data.email} />
              <span>Email</span>
            </div>
            <div className='input-bx'>
              <input type="password" required name='password' onChange={handleChange} value={data.password} />
              <span>Password</span>
            </div>
            <button type='submit' >
              {loading ? "loading..." : "Login"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
