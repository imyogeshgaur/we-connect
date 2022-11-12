import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import PostBar from '../assets/PostBar';

const Post = () => {
    const param = useParams();
    const [data, setdata] = useState("")
    const [post, setpost] = useState([])

    useEffect(() => {
        //Find Logged In User Details
        fetch("http://localhost:5000/auth/getLoginUser/" + document.cookie.split('=')[1])
            .then(res => res.json())
            .then(data => setdata(data))

        //Find Post By Creator 
        fetch("http://localhost:5000/posts/findById/" + param.id)
            .then(res => res.json())
            .then(post => setpost(post))
            .catch(err => console.log(err))
    }, [param.id])
    
    return (
        <>
            <PostBar name={data.userName} />
            <div className="mt-3" style={{display:"flex",justifyContent:"center"}}>
            <div className='card card-light col col-md-4 col-lg-4 col-sm-4 col-xs-12'>
                <img src={post.image} class="card-img-top" alt="data" height="435px"/>
                    <div class="card-body">
                        <h5 class="card-title">{post.hashtag}</h5>
                        <p class="card-text">{post.caption}</p>
                        <Link to="/profile" class="btn btn-primary">Back</Link>
                    </div>
            </div>
            </div>
        </>
    )
}

export default Post