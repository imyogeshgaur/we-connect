import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostViewBar from '../assets/PostViewBar'


const ViewProfile = () => {
  const [data, setdata] = useState("")
  const [userName, setuserName] = useState("")
  const param = useParams();
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [location, setlocation] = useState("")
  const [company, setcompany] = useState("")
  const [position, setposition] = useState("")
  const [user, setuser] = useState("")
  useEffect(() => {
    fetch("http://localhost:5000/auth/getLoginUser/" + document.cookie.split('=')[1])
      .then(res => res.json())
      .then(data => setdata(data))
      .catch(err => console.log(err))

    fetch("http://localhost:5000/auth/getUser/" + param.id)
      .then(res => res.json())
      .then(data => {
        setuserName(data.auth.userName)
        setname(data.user.name)
        setemail(data.auth.email)
        setphone(data.user.phone)
        setlocation(data.user.location)
        setcompany(data.user.company)
        setposition(data.user.position)
        setuser(data.user)
      })
  }, [param.id])

  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:5000/users/create", {
        mode: "cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({authId:param.id, name, phone, location, company, position })
      })
      alert("Details Updated !!!")
      window.location.reload(false);
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleUpdate = async () => {
    try {
      await fetch("http://localhost:5000/users/update/" + param.id, {
        mode: "cors",
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({authId:param.id, name, phone, location, company, position })
      })
      alert("Details Updated !!!")
      window.location.reload(false);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <PostViewBar name={`@${data.userName}`} secondOption={"Add Post"} secondOptionURL={"/addPost"} />
      <div class="card mx-auto mt-4" style={{ width: "48rem" }}>
        <div class="card-body">
          <div className="wrapper mt-3">
            <div className="file-upload">
              <input type="file" id="userInput" />
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
          <h5 class="card-title text-center">{userName} Profile</h5>
          <div class="row mt-2">
            <div class="col">
              <input type="text" class="form-control" placeholder="Enter Name" value={name} onChange={(e) => { setname(e.target.value) }} />
            </div>
            <div class="col">
              <input type="text" class="form-control" value={email} disabled={true} />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <input type="text" class="form-control" placeholder="Enter Phone" aria-label="Enter Phone" value={phone} onChange={(e) => { setphone(e.target.value) }} />
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Enter Location" aria-label="Enter Location" value={location} onChange={(e) => { setlocation(e.target.value) }} />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <input type="text" class="form-control" placeholder="Enter Comapany Unit" aria-label="Enter Comapany Unit" value={company} onChange={(e) => { setcompany(e.target.value) }} />
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Enter Position" aria-label="Enter Position" value={position} onChange={(e) => { setposition(e.target.value) }} />
            </div>
          </div>
        </div>
        <button onClick={user==="" ? handleSubmit : handleUpdate} class="btn btn-danger mb-3 w-50 mx-auto">Submit</button>
      </div>
    </>
  )
}

export default ViewProfile