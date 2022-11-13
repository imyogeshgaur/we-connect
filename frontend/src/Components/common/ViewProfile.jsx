import {useEffect,useState} from 'react'
import PostViewBar from '../assets/PostViewBar'

const ViewProfile = () => {
    const [data, setdata] = useState("")

    useEffect(() => {
        fetch("http://localhost:5000/auth/getLoginUser/" + document.cookie.split('=')[1])
        .then(res => res.json())
        .then(data => setdata(data))
        .catch(err=>console.log(err))
    }, [])
    
  return (
    <>
    <PostViewBar name={data.userName}/>
         <div className="wrapper mt-3">
            <div className="file-upload">
                <input type="file" id="userInput"/>
                <i className="fa-solid fa-user"></i>
            </div>
        </div>
    </>
  )
}

export default ViewProfile