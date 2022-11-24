import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from "../assets/NavBar"
import ProfileCard from '../assets/ProfileCard';

const Friends = () => {
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
      .then(data => setuser(data))
  }, [navigate, token])
  const filteredVal = user.filter(val=>val.auth.userName !== data.userName)
  return (
    <>
      <NavBar name={`@${data.userName}`} secondOption={"View Profile"} secondOptionURL={`/viewDetail/${data._id}`} />
      <div className="row mt-4">
        {
          filteredVal.map((val) => {
            return (
              <>
                  <ProfileCard id={val.auth._id} userName={val.auth.userName} image={val.user.image} selected={selected}  setSelected={setSelected}/>
              </>
            )
          })
        }
      </div>
    </>
  )
}

export default Friends