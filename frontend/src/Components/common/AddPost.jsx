import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from "../assets/NavBar"

const AddPost = () => {
    const [caption, setcaption] = useState("")
    const [hashtag, sethashtag] = useState("")
    const [file, setfile] = useState("")
    const navigate = useNavigate();

    const uploadPost = async () => {
        try {
            const elements = document.cookie.split('=');
            const token = elements[1];
            const formData = new FormData()
            formData.append("post", file)
            formData.append("caption",caption)
            formData.append("hashtag",hashtag)
            formData.append("token",token)
            await fetch("http://localhost:5000/posts/create", {
                method: 'POST',
                mode: "cors",
                body:formData
            })
            alert("Uploaded !!!")
            navigate("/profile")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <NavBar  />
            <div className={"card mx-auto mt-4"} style={{ width: "38rem" }}>
                <div className={"imageUpload-light"}>
                    <input type="file" name="" id="postImgInput" onChange={(e) => setfile(e.target.files[0])} />
                    <i className={"fa-solid fa-image fa-3x mt-5"} style={{ display: 'flex', justifyContent: "center" }}></i>
                    <h3 className={"mt-3"} style={{ display: 'flex', justifyContent: "center" }}>Add Image</h3>
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