import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

const PostBar = (props) => {
    const [data, setdata] = useState("")
    useEffect(() => {
        //Find Logged In User Details
        fetch("http://localhost:5000/auth/getLoginUser/" + document.cookie.split('=')[1])
        .then(res => res.json())
        .then(data => setdata(data))
        .catch(err=>console.log(err))
     }, [])
    return (
        <>
            <nav className={"navbar navbar-light navbar-expand-lg bg-danger" }>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <p className="navbar-brand mx-auto">{props.name===undefined ? "" : `Welcome ${props.name} To We Connect`}</p>
                        </ul>
                    </div>
                    <Link to="/addPost">
                        <i className={"icon-light fa-solid fa-square-plus me-4 fa-2x"}></i>
                    </Link>
                </div>
                <div className="dropdown">
                        <i className={"icon-light fa-solid fa-user me-4 fa-2x dropdown-toggle"} data-bs-toggle="dropdown" aria-expanded="false" />
                        <ul className="dropdown-menu card-light" style={{ marginLeft: "-5rem", marginTop: "0.6rem" }}>
                            <Link to={`/viewDetail/${data._id}`} style={{textDecoration:"none"}}><li><button className="dropdown-item">View Profile</button></li></Link>
                            <li><button className="dropdown-item">Log Out</button></li>
                        </ul>
                    </div>
            </nav>
        </>
    )
}

export default PostBar