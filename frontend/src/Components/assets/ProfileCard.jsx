import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProfileCard = (props) => {
    const [data, setdata] = useState("")
    const navigate = useNavigate();
    const token = document.cookie.split('=')[1];
    const senderId = data._id;
    const reciverId = props.id;
    useEffect(() => {
        if (token === undefined) {
            navigate("/");
        } else {
            fetch("http://localhost:5000/auth/getLoginUser/" + token)
                .then(res => res.json())
                .then(data => setdata(data))
                .catch(err => console.log(err))
        }
    }, [navigate, token,s])
    const sendRequest = () => {
        try {
            if (props.selected === reciverId) {
                fetch(`http://localhost:5000/users/request/${senderId}`, {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reciverId })
                })
                alert("Request Send Sucessfully !!!")
            }
        } catch (error) {

        }
    }
    return (
        <>
            <div className="col col-md-4 col-lg-4 col-sm-4 col-xs-12" key={props.id}>
                <div className={"card card-light mt-4"} key={props.id}>
                    <img src={props.image} alt="data" className='card-img-top' height="235px" />
                    <h1 className='text-center'>@{props.userName}</h1>
                    <button className="btn btn-danger w-50 mx-auto" onClick={(e) => props.setSelected(props.id)}>Add Friend</button>
                </div>
            </div>
        </>
    )
}

export default ProfileCard