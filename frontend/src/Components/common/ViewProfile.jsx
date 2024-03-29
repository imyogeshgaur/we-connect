import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../assets/NavBar'
import { FaUserEdit } from "react-icons/fa"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ViewProfile = (props) => {
  const [data, setdata] = useState("")
  const [userName, setuserName] = useState("")
  const param = useParams();
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [location, setlocation] = useState("")
  const [company, setcompany] = useState("")
  const [position, setposition] = useState("")
  const [image, setimage] = useState("")
  const [file, setfile] = useState("")
  const [user, setuser] = useState("")
  const navigate = useNavigate();
  const token = document.cookie.split('=')[1];

  useEffect(() => {
    //Find Logged In User Details
    if (token === undefined) {
      navigate("/");
    } else {
      fetch("http://localhost:5000/auth/getLoginUser/" + token)
        .then(res => res.json())
        .then(data => setdata(data))
        .catch(err => console.log(err))
    }

    fetch("http://localhost:5000/auth/getUser/" + param.id)
      .then(res => res.json())
      .then(data => {
        setuserName(data.auth.userName!==undefined ? data.auth.userName : "")
        setemail(data.auth.email!==undefined ? data.auth.email : "")
        setname(data.user.name!==undefined ? data.user.name : "")
        setphone(data.user.phone!==undefined ? data.user.phone : "")
        setlocation(data.user.location!==undefined ? data.user.location : "")
        setcompany(data.user.company!==undefined ? data.user.company : "")
        setposition(data.user.position!==undefined ? data.user.position : "")
        setuser(data.user!==undefined ? data.user : "")
        if (data.user.image) {
          setimage(data.user.image)
          document.getElementById("template1").classList.add("hide")
        } else {
          document.getElementById("template2").classList.add("hide")
        }
      })
  }, [token, navigate, param.id])

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("profile", file);
      formData.append("name", name)
      formData.append("phone", phone)
      formData.append("location", location)
      formData.append("company", company)
      formData.append("position", position)
      formData.append("authId", param.id);
      await fetch("http://localhost:5000/users/create", {
        mode: "cors",
        method: 'POST',
        body: formData
      })
      const a = toast.success("Details Updated !!!", {
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
          window.location.reload(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("profile", file);
      formData.append("name", name)
      formData.append("phone", phone)
      formData.append("location", location)
      formData.append("company", company)
      formData.append("position", position)
      formData.append("authId", param.id);
      await fetch("http://localhost:5000/users/update/" + param.id, {
        mode: "cors",
        method: 'PUT',
        body: formData
      })
      const a = toast.success("Details Updated !!!", {
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
          window.location.reload(false);
        }, 2000);
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
          navigate(`/viewDetail/${param.id}`)
        }, 2000);
      }
    }
  }

  return (
    <>
      <NavBar name={`@${data.userName}`} secondOption={"View Post"} secondOptionURL={"/profile"} />
      <ToastContainer autoClose={1000} />
      <div className="card mx-auto mt-4 card-light" style={{ width: "48rem" }}>
        <div className="card-body">
          <div className="wrapper mt-3" id='template1'>
            <div className="file-upload">
              <input type="file" id="userInput" onChange={(e) => setfile(e.target.files[0])} />
              <FaUserEdit color={"white"} size={85} className="mx-auto"/>
            </div>
          </div>
          <div className="wrapper mt-3" id='template2'>
            <div className="file-upload">
              <img src={image} alt="" width="300" />
              <input type="file" id="userInput" onChange={(e) => setfile(e.target.files[0])} />
            </div>
          </div>
          <h5 className="card-title text-center">{userName} Profile</h5>
          <div className="row mt-2">
            <div className="col">
              <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => { setname(e.target.value) }} />
            </div>
            <div className="col">
              <input type="text" className="form-control" value={email} disabled={true} />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <input type="text" className="form-control" placeholder="Enter Phone" aria-label="Enter Phone" value={phone} onChange={(e) => { setphone(e.target.value) }} />
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="Enter Location" aria-label="Enter Location" value={location} onChange={(e) => { setlocation(e.target.value) }} />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <input type="text" className="form-control" placeholder="Enter Comapany Unit" aria-label="Enter Comapany Unit" value={company} onChange={(e) => { setcompany(e.target.value) }} />
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="Enter Position" aria-label="Enter Position" value={position} onChange={(e) => { setposition(e.target.value) }} />
            </div>
          </div>
        </div>
        <button onClick={user === "" ? handleSubmit : handleUpdate} className="btn btn-danger mb-3 w-50 mx-auto">Submit</button>
      </div>
    </>
  )
}

export default ViewProfile