import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostBar from '../assets/PostBar'

const Profile = () => {

    const [data, setdata] = useState("")
    const [posts, setposts] = useState([])
 
    useEffect(() => {
        //Find Logged In User Details
        fetch("http://localhost:5000/auth/getLoginUser/" + document.cookie.split('=')[1])
        .then(res=> res.json())
        .then(data=> setdata(data))

        //Find Post By Creator 
        fetch("http://localhost:5000/posts/find/" + data.email)
            .then(res => res.json())
            .then(post => setposts(post))
            .catch(err => console.log(err))
    }, [data.email])

    return (
        <>
            <PostBar name={data.userName} />
            <h1 className="text-center">{posts.length === 0 ? "No Post To Display" : " "}</h1>
            <div className="row mt-4">
                {
                    posts.map((val) => {
                        return (
                            <>
                                <div className="col col-md-4 col-lg-4 col-sm-4 col-xs-12" key={val._id}>
                                    <div className={"card card-light mt-4"} key={val._id}>
                                        <Link to={`/post/${val._id}`} key={val._id}>
                                            <img src={val.image} alt="data" className='card-img-top' height="435px" />
                                        </Link>
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

export default Profile