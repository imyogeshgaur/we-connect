import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from "../assets/NavBar"

const Friends = () => {
  const navigate = useNavigate();
  const token = document.cookie.split('=')[1];
  const [data, setdata] = useState("")
  const [user, setuser] = useState([])
  const [isSelected, setisSelected] = useState(null);

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
  const sendFriendRequest = ()=>{
      console.log(isSelected);
      
  }
  return (
    <>
      <NavBar name={`@${data.userName}`} secondOption={"View Profile"} secondOptionURL={`/viewDetail/${data._id}`} />
      <div className="row mt-4">
        {
          filteredVal.map((val) => {
            return (
              <>
                <div className="col col-md-4 col-lg-4 col-sm-4 col-xs-12" key={val.auth._id} selected={isSelected===val.auth._id} onSelect={()=>setisSelected(val.auth._id)}>
                  <div className={"card card-light mt-4"} key={val.auth._id}>
                    <img src={val.user.image} alt="data" className='card-img-top' height="235px" />
                    <h1 className='text-center'>@{val.auth.userName}</h1>
                    <button className="btn btn-danger w-50 mx-auto" onClick={sendFriendRequest}>Add Friend</button>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
    </>
  )
}

export default Friends