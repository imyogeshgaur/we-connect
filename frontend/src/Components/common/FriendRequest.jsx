import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../assets/NavBar'

const FriendRequest = () => {
    const [data, setdata] = useState("")
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
    }, [navigate,token])
    
  return (
    <>
        <NavBar name={`@${data.userName}`} secondOption={"View Profile"} secondOptionURL={`/viewDetail/${data._id}`} /> 
        
    </>
  )
}

export default FriendRequest