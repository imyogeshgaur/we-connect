import {useState} from 'react'
import NavBar from '../assets/NavBar'

const ForgetPassword = () => {
  const [email, setemail] = useState("")
  const forgetPassApiCall = () =>{

  }
  return (
    <>
    <NavBar />
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