import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../assets/NavBar'
import RequestCard from '../assets/RequestCard'

const FriendRequest = () => {
  const [data, setdata] = useState("")
  const [user, setuser] = useState([])
  const [selected, setSelected] = useState(null)
  const token = document.cookie.split('=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (token === undefined) {
      navigate("/");
    } else {
      fetch("http://localhost:5000/auth/getLoginUser/" + token)
        .then(res => res.json())
        .then(data => setdata(data))
        .catch(err => console.log(err))
    }
    fetch("http://localhost:5000/users/request/" + data._id)
      .then(res => res.json())
      .then(data => {
        setuser(data)
        console.log(data[1].user.image);
      })
  }, [navigate, token, data._id])
  if (user.length === 0) {
    return (
      <>
        <NavBar name={`@${data.userName}`} secondOption={"View Profile"} secondOptionURL={`/viewDetail/${data._id}`} showUser={"none"}/>
        <h1 className='text-center'>No Pending Request!!!</h1>
      </>
    )
  }
  return (
    <>
      <NavBar name={`@${data.userName}`} secondOption={"View Profile"} secondOptionURL={`/viewDetail/${data._id}`} showUser={"none"}/>
      <div className="row mt-4">
        {
          user.map((val) => {
            return (
              <>
                <RequestCard id={val.auth._id} userName={val.auth.userName} image={val.user.image} selected={selected} setSelected={setSelected} />
              </>
            )
          })
        }
      </div>

    </>
  )
}

export default FriendRequest