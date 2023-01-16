import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import NavBar from '../assets/NavBar';

const EditPost = () => {
    const [data, setdata] = useState("")
    const param = useParams();
    const [caption, setcaption] = useState("")
    const [hashtag, sethashtag] = useState("")
    const [file, setfile] = useState("")
    const [image, setimage] = useState("")
    const token = document.cookie.split('=')[1];
    const navigate = useNavigate();
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
            .then(post => {
                setcaption(post.caption)
                sethashtag(post.hashtag)
                if (post.image) {
                    setimage(post.image)
                    document.getElementById("template1").classList.add("hide")
                } else {
                    document.getElementById("template2").classList.add("hide")
                }
            })
            .catch(err => console.log(err))
    }, [token, navigate, param.id])


    const editPost = async () => {
        try {
            const formData = new FormData();
            formData.append("hashtag", hashtag);
            formData.append("caption", caption);
            formData.append("post", file);
            const response = await fetch(`http://localhost:5000/posts/update/${param.id}`, {
                mode: "cors",
                method: 'PUT',
                body: formData
            });
            const data = await response.json();
            if (data.message === "Post Updated !!!") {
                const a = toast.success(data.message, {
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
                        window.location.href = "/profile"
                    }, 2000);
                }
            } else {
                const a = toast.error(data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    closeOnClick: false,
                    closeButton: false,
                    style: {
                        color: "red",
                        backgroundColor: "rgb(255, 206, 206)"
                    }
                })
                if (a == 1) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            }

        } catch (error) {
            console.log(error)
            const a = toast.error("Network Error !!!", {
                position: toast.POSITION.TOP_CENTER,
                closeOnClick: false,
                closeButton: false,
                style: {
                    color: "red",
                    backgroundColor: "rgb(255, 206, 206)"
                }
            })
            if (a == 1) {
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        }
    }
    return (
        <>
            <NavBar name={`@${data.userName}`} secondOption={"View Post"} secondOptionURL={"/profile"} />
            <ToastContainer autoClose={1000} />
            <div className="card mx-auto mt-4 card-light" style={{ width: "48rem" }}>
                <div className="card-body">
                    <div className="wrapper mt-3" id='template1'>
                        <div className="file-upload">
                            <input type="file" id="userInput" onChange={(e) => setfile(e.target.files[0])} />
                        </div>
                    </div>
                    <div className="wrapper mt-3" id='template2'>
                        <div className="file-upload">
                            <img src={image} alt="" width="300" />
                            <input type="file" id="userInput" onChange={(e) => setfile(e.target.files[0])} />
                        </div>
                    </div>
                    <h5 className="card-title text-center">Update Post</h5>
                    <div className="row mt-2">
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                value={caption}
                                onChange={(e) => setcaption(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                value={hashtag}
                                onChange={(e) => sethashtag(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={editPost}
                    className="btn btn-danger mb-3 w-50 mx-auto"
                >
                    Submit
                </button>
            </div>
        </>
    )
}

export default EditPost