import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = (props) => {
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

export default NotFoundPage