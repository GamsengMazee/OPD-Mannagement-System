import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [user, setUser] =useState({name: '', password: ''})
  const navigate = useNavigate()

  const inputHandler = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const { value } = e.target;

    setUser((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
     e.preventDefault()
    fetch(`${process.env.REACT_APP_BASE_URL}/`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       name: user.name,
       password: user.password,
      }),
    })
      .then((res) => {
        console.log(res)
          if(res.status === 200){
             navigate('/home')
          }else{
            window.alert('Invalid Login Credentials')
          }

      })
      .catch((err) => console.log(err.message));
  }

  //redirect if the user has already login
  const authenticate = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/auth`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })

        const data = await res.json();

        if(res.status === 200){
          navigate('/home')
       }
        if(!data.status === 200){
            throw new Error(res.error)
        }
        
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
authenticate()
})

  

  return (
    <div className="login">
      <h1 className="text-center fw-bolder">BYRNIHAT PHC</h1>
      <div className="login__wrapper">
        <div className="login__container">

          <form onSubmit={submitHandler} className="login__form">
              <h5 className="text-center text-primary fw-bolder">LOGIN</h5>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                name="name"
                value={user.name}
                onChange={inputHandler}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                Trust me, your login is secure.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                name="password"
                value={user.password}
                onChange={inputHandler}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Keep me logged in
              </label>
            </div>
            <button onClick={submitHandler} type="submit" className="btn btn-primary">
              Login
            </button>
          </form>

          <div className="loginImg__container">
            <img src={require("../../images/login1.png")} alt="img" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
