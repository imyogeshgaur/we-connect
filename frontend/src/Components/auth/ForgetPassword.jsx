import { useState } from 'react'
import NavBar from '../assets/NavBar'
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setemail] = useState("")
  const navigate = useNavigate();
  const forgetPassApiCall = async () => {
    try {
      const res = await fetch(`http://localhost:5000/auth/forgetPassword/${email}`);
      const data = await res.json();
      if (data) {
        navigate(`/resetPass/${email}`)
      } else {
        const a = toast.error("User Not Exist !!!", {
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
            <h3 className={"card-title text-center mb-2 text-dark"}>Enter Your Email</h3>
          </div>
          <div className="form-group mt-3">
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 my-4">
            <button type="submit" className="btn btn-danger" onClick={forgetPassApiCall}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword