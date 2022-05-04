import React, { useEffect, useState } from "react";
import "./Register.css";

function Login() {
  const [user, setUser] =useState({name: '', password: '', cpassword: ''})
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)



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

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "*Name is required.";
    }
    if(values.name.length < 3){
      errors.name = 'Name is too short. Minimum of 4 charecters is required'
    }
    if(!values.password){
      errors.password = 'Invalid Password'
    }
    if(values.password.length < 4){
      errors.password = 'Minimum of 5 charecters is required'
    }
    if(values.password !== values.cpassword){
      errors.password = 'Password does not match'
    }
    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         name: user.name,
         password: user.password,
         dor: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString()
        }),
      })
        .then((res) => {
           alert('New User Added Successfully')
           setUser({name: '', password: '', cpassword: ''})
        })
        .catch((err) => console.log(err.message));
    }
  }, [formErrors, isSubmit]);

  return (
    <div className="register">
      <h1 className="text-center fw-bolder">BYRNIHAT PHC</h1>
      <div className="register__wrapper">
        <div className="register__container">
          <div className="registerImg__container">
            <img src={require("../../images/register1.png")} alt="img" />
          </div>

          <form onSubmit={submitHandler} className="register__form">
            <h5 className="text-center text-primary fw-bolder">SIGN UP</h5>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="name"
                onChange={inputHandler}
                className="form-control"
                value={user.name}
                aria-describedby="emailHelp"
              />
              <div className="form-text">
                 <p style={{color: 'red', fontSize: '10px'}}>{formErrors.name}</p>
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
              />
              <div  className="form-text">
                <p style={{color: 'red', fontSize: '10px'}}>{formErrors.password}</p>
              </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              name="cpassword"
              value={user.cpassword}
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
                Keep me signed in
              </label>
            </div>
            <button type="submit" onClick={submitHandler} className="btn btn-primary">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
