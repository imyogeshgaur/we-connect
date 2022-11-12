import React from 'react'
import { Link } from 'react-router-dom'

const PostBar = (props) => {
    return (
        <>
            <nav className={"navbar navbar-light navbar-expand-lg bg-danger" }>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <Link className="navbar-brand mx-auto" to="/">{props.name===undefined ? "" : `Welcome ${props.name}`}</Link>
                        </ul>
                    </div>
                    <Link to="/addPost">
                        <i className={props.mode === 'light' ? "icon-light fa-solid fa-square-plus me-4 fa-2x" : "fa-solid fa-square-plus me-4 fa-2x icon-dark"}></i>
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default PostBar