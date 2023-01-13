import { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import NavBar from '../assets/NavBar'

const ResetPassword = () => {
  const [password, setpassword] = useState("")
  const [confPassword, setconfPassword] = useState("")
  
  const param = useParams();
  const navigate = useNavigate();
  const resetPasswordApiCall = async () => {
    try {
      if (password === confPassword) {
        await fetch(`http://localhost:5000/auth/updatePassword/${param.email}`, {
          mode: 'cors',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password })
        });
        alert("Password Updated !!!")
        navigate("/");
        setpassword("")
        setconfPassword("")
      } else {
        alert("Password Not Matched !!!")
        setpassword("")
        setconfPassword("")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <NavBar detail={"hidden"}/>
      <div className={"Auth-form card-light mx-auto mt-5"}>
        <div className="Auth-form-content">
          <div className="text-center">
            <h3 className={"card-title text-center mb-2 text-dark"}>Enter Your Credentials</h3>
          </div>
          <div className="form-group mt-3">
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter your new Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-2"
              placeholder="Enter your Password Again "
              value={confPassword}
              onChange={(e) => setconfPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 my-4">
            <button type="submit" className="btn btn-danger" onClick={resetPasswordApiCall}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword