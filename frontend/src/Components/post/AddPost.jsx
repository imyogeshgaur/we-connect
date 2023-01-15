import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../assets/NavBar'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {BsImageFill} from "react-icons/bs"

const AddPost = (props) => {
    const [data, setdata] = useState("")
    const [caption, setcaption] = useState("")
    const [hashtag, sethashtag] = useState("")
    const [file, setfile] = useState("")
    const navigate = useNavigate();
    const token = document.cookie.split('=')[1];

    useEffect(() => {
        if (token === undefined) {
            navigate("/");
        } else {
            fetch("http://localhost:5000/auth/getLoginUser/" + token)
                .then(res => res.json())
                .then(data => setdata(data))
                .catch(err => console.log(err))
        }
    })

    const uploadPost = async () => {
        try {
            const formData = new FormData()
            formData.append("post", file)
            formData.append("caption", caption)
            formData.append("hashtag", hashtag)
            await fetch("http://localhost:5000/posts/createPost", {
                method: 'POST',
                mode: "cors",
                headers: {
                    'authorization': token
                },
                body: formData
            })
            const a = toast.success("Post Uploaded !!!", {
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
            <NavBar name={`@${data.userName}`} secondOption={"View Profile"} secondOptionURL={`/viewDetail/${data._id}`} showPost={"none"}/>
            <ToastContainer autoClose={1000} />
            <div className={"card mx-auto mt-4 card-light"} style={{ width: "38rem" }}>
                <div className={"imageUpload-light"}>
                    <input type="file" name="" id="postImgInput" onChange={(e) => setfile(e.target.files[0])} />
                    <BsImageFill style={{marginLeft:"17rem",marginTop:"3rem" }} size={78}/>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className={"form-label"}>Post Caption</label>
                        <textarea className="form-control" placeholder='Add Caption...' rows="3" value={caption} onChange={(e) => setcaption(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className={"form-label"}>Post Hastags</label>
                        <textarea className="form-control" placeholder='Add Hash tags' rows="3" value={hashtag} onChange={(e) => sethashtag(e.target.value)}></textarea>
                    </div>
                </div>
                <button className="btn btn-danger w-50 mx-auto mb-3" onClick={uploadPost}>Add Post</button>
            </div>
        </>
    )
}

export default AddPost