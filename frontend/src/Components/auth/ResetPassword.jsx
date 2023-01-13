import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
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
        const a = toast.success("Password Updated !!!", {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "green",
            backgroundColor: "rgb(183, 248, 183)"
          }
        })
        if (a == 1) {
          setTimeout(() => {
            navigate("/");
            setpassword("")
            setconfPassword("")
          }, 2000);
        }
      } else {
        const a = toast.error("Password Not Matched !!!", {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "red",
            backgroundColor: "rgb(255, 206, 206)"
          }
        })
        if (a == 1) {
          setTimeout(() => {
            window.location.href="/"
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
      const a = toast.error("Network Error !!!", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: false,
        closeButton: false,
        style: {
          color: "red",
          backgroundColor: "rgb(255, 206, 206)"
        }
      })
      if (a == 1) {
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
    }
  }
  return (
    <>
      <NavBar detail={"hidden"} />
      <ToastContainer autoClose={1000} />
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