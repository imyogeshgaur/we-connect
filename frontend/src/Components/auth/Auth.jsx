import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../assets/NavBar'

const Auth = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState("signin")
  const [userName, setuserName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const signUpApiCall = async () => {
    try {
      await fetch("http://localhost:5000/auth/signup", {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, email, password })
      })
      setuserName("")
      setemail("")
      setpassword("")
      alert("Welcome To Our Plateform !!!")
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }
  const loginApiCall = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'same-origin',
        body: JSON.stringify({ email, password })
      })
      const data = await res.json();
      document.cookie = `jwt=${data.token}`
      alert("Logged In !!!")
      navigate("/profile")
      setuserName("")
      setemail("")
      setpassword("")
    } catch (error) {
      console.log(error);
    }
  }

  if (authMode === "signin") {
    return (
      <>
        <NavBar detail={"hidden"}/>
        <div className={"Auth-form card-light mx-auto mt-5"}>
          <div className="Auth-form-content">
            <h3 className={"card-title text-center mb-2 text-dark"}>Sign In</h3>
            <div className="text-center">
              Not registered yet?
              <span className={"link-primary ms-2"} onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label className={"text-dark"}>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className={"text-dark"}>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-danger" onClick={loginApiCall}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot  <Link to="/forgetPass" className={'link-primary'} style={{ textDecoration: "none" }}>password</Link>
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <NavBar detail={"hidden"}/>
      <div className={"Auth-form card-light mx-auto mt-5"}>
        <div className="Auth-form-content">
          <h3 className={"card-title text-center mb-2 text-dark"}>Sign In</h3>
          <div className="text-center">
            Not registered yet?
            <span className={"link-primary ms-2"} onClick={changeAuthMode}>
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label className={"text-dark"}>User's Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter name"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className={"text-dark"}>Email Address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className={"text-dark"}>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-danger" onClick={signUpApiCall}>
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot  <Link to="#" className={'link-primary'} style={{ textDecoration: "none" }}>password</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Auth