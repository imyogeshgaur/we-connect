import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import NavBar from '../assets/NavBar';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Post = (props) => {
    const param = useParams();
    const navigate = useNavigate();
    const [data, setdata] = useState("")
    const [post, setpost] = useState([])
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
        fetch("http://localhost:5000/posts/findById/" + param.id)
            .then(res => res.json())
            .then(post => setpost(post))
            .catch(err => console.log(err))
    }, [token, navigate, param.id])

    const deletePost = async () => {
        try {
            await fetch(`http://localhost:5000/posts/delete/${param.id}`, {
                mode: 'cors',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const a = toast.success("Post Deleted Sucessfully !!!", {
                position: toast.POSITION.TOP_CENTER,
                closeOnClick: false,
                closeButton: false,
                style: {
                    color: "green",
                    backgroundColor: "rgb(183, 248, 183)"
                }
            })
            if (a == 1) {
                setTimeout(() => {
                    navigate("/profile")
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <NavBar name={`@${data.userName}`} />
            <ToastContainer autoClose={1000} />
            <div className="mt-3" style={{ display: "flex", justifyContent: "center" }}>
                <div className='card card-light col col-md-4 col-lg-4 col-sm-4 col-xs-12'>
                    <img src={post.image} class="card-img-top" alt="data" height="235px" />
                    <div class="card-body">
                        <h5 class="card-title">{post.hashtag}</h5>
                        <p class="card-text">{post.caption}</p>
                        <button className="btn btn-danger me-3" onClick={deletePost}>Delete</button>
                        <Link to="/profile" class="btn btn-primary">Back</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post