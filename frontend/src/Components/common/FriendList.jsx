import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from "../assets/NavBar"
import ProfileCard from '../assets/ProfileCard';

const FriendList = () => {
  const navigate = useNavigate();
  const token = document.cookie.split('=')[1];
  const [data, setdata] = useState("")
  const [user, setuser] = useState([])
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (token === undefined) {
      navigate("/");
    } else {
      fetch("http://localhost:5000/auth/getLoginUser/" + token)
        .then(res => res.json())
        .then(data => setdata(data))
        .catch(err => console.log(err))
    }
    fetch("http://localhost:5000/users/list")
      .then(res => res.json())
      .then(data => {
        setuser(data)
        console.log(data[2].user.image)
      })
  }, [navigate, token])
  const filteredVal = user.filter(val => val.auth.userName !== data.userName)
  if (filteredVal === 0) {
    return (
      <>
        <NavBar name={`@${data.userName}`} secondOption={"View Profile"} secondOptionURL={`/viewDetail/${data._id}`} showUser={"none"}/>
        <h1 className="text-center">No User Available !!!</h1>
      </>
    )
  }
  return (
    <>
      <NavBar name={`@${data.userName}`} secondOption={"View Profile"} secondOptionURL={`/viewDetail/${data._id}`} showUser={"none"}/>
      <div className="row mt-4">
        {
          filteredVal.map((val) => {
            return (
              <>
                <ProfileCard id={val.auth._id} userName={val.auth.userName} image={val.user.image} selected={selected} setSelected={setSelected} btnName={"Add Friend"} />
              </>
            )
          })
        }
      </div>
    </>
  )
}

export default FriendList