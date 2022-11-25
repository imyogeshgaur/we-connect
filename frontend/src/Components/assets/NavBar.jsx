import { Link, useNavigate } from "react-router-dom"

const NavBar = (props) => {
  const navigate = useNavigate();
  const logoutUser = () => {
    document.cookie = "jwt=undefined;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    navigate("/");
  }
  if (props.detail === "hidden") {
    return (
      <>
        <nav className={"navbar navbar-light navbar-expand-lg bg-danger"}>
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <p className="navbar-brand mx-auto">We Connect</p>
              </ul>
            </div>
          </div>
        </nav>
      </>
    )
  }
  return (
    <>
      <nav className={"navbar navbar-light navbar-expand-lg bg-danger"}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <p className="navbar-brand mx-auto">{props.name === undefined ? "" : `Welcome ${props.name} To We Connect`}</p>
            </ul>
          </div>
          <Link to="/addPost">
            <i className={"icon-light fa-solid fa-square-plus me-4 fa-2x"}></i>
          </Link>
        </div>
        <div className="dropdown">
          <i className={"icon-light fa-solid fa-user me-4 fa-2x dropdown-toggle"} data-bs-toggle="dropdown" aria-expanded="false" />
          <ul className="dropdown-menu card-light" style={{ marginLeft: "-5rem", marginTop: "0.6rem" }}>
            <Link to={props.secondOptionURL} style={{ textDecoration: "none" }}><li><button className="dropdown-item">{props.secondOption}</button></li></Link>
            <Link to="/friendList" style={{ textDecoration: "none" }}><li><button className="dropdown-item">See Friends</button></li></Link>
            <Link to="/friendRequest" style={{ textDecoration: "none" }}><li><button className="dropdown-item">See Requests</button></li></Link>
            <li><button className="dropdown-item" onClick={logoutUser}>Log Out</button></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar