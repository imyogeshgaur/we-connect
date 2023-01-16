import React from 'react'
import { Link } from 'react-router-dom'

const Authorization = (props) => {

    const loginAgain = ()=>{
        document.cookie = undefined;
        window.location.href = "/"
    }

    if (props.type === "Authorization") {
        return (
            <>
                <div className="card mx-auto mt-1">
                    <div className="card-body">
                        <h1 className="card-title mb-4 text-center">Unauthorized Access !!!</h1>
                        <div style={{ width: "100%", height: 0, paddingBottom: "56%", position: "relative" }}><iframe src="https://giphy.com/embed/L7zmmuaEo50MCt1Y7o" width="100%" height="100%" style={{ position: "absolute" }} className="giphy-embed" allowFullScreen></iframe></div>
                    </div>
                    <button className="btn btn-danger mx-auto w-50 mb-3" onClick={loginAgain}>Login Again</button>
                </div>
            </>
        )
    } else {
        return (
            <>
                <section class="page_404">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 ">
                                <div class="col-sm-10 col-sm-offset-1  text-center">
                                    <div class="four_zero_four_bg"></div>
                                    <h1>Page Not Found !!!</h1>
                                    <div class="contant_box_404">
                                        <Link to="/"><button class="link_404">Go To Home</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Authorization