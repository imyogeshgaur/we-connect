const NavBar = () => {
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

export default NavBar