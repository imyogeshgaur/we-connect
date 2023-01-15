import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../assets/NavBar';
import PostCard from '../assets/PostCard';


const Profile = (props) => {
    const navigate = useNavigate();
    const [data, setdata] = useState("")
    const [posts, setposts] = useState([])
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

        //Find Post By Creator 
        fetch("http://localhost:5000/posts/find/" + data.email)
            .then(res => res.json())
            .then(post => setposts(post))
            .catch(err => console.log(err))
    }, [token,navigate,data.email])

    return (
        <>
            <NavBar name={`@${data.userName}`}  secondOption={"View Profile"} secondOptionURL={`/viewDetail/${data._id}`}/>
            <h1 className="text-center">{posts.length === 0 ? "No Post To Display" : " "}</h1>
            <div className="row mt-4">
                {
                    posts.map((val) => {
                        return (
                            <>
                               <PostCard id={val._id} image={val.image}/>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Profile