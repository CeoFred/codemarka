/** @format */

// yet to start

import React from 'react'
import notFoundImg from '../../../media/images/vectors/hugo-fatal-error.png'

function AlreadyInClassName(props) {
    return (
        <div>
            <section className="vh-100 d-flex align-items-center">
                <div
                    className="position-absolute h-100 top-0 right-0 zindex-110 col-lg-6 col-xl-6 zindex-100 d-none d-lg-flex flex-column justify-content-end rounded-bottom-left"
                    data-bg-size="cover"
                    data-bg-position="center">
                    <img
                        src={ notFoundImg }
                        alt="Image"
                        className="img-as-bg rounded-bottom-left"
                    />
                </div>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-sm-7 col-lg-6 col-xl-6 mx-auto ml-lg-0">
                            <div className="row justify-content-center">
                                <div className="col-11 col-lg-10 col-xl-6 py-5">
                                    <h6 className="display-1 mb-3 font-weight-600 text-warning">
                                        Oops!
                                    </h6>
                                    <p className="lead text-lg mb-3">You are already logged into this session.</p>

                                    <a
                                        href="#"
                                        className="text-primary hover-translate-y-n3 mt-3">
                                        <span className="btn-inner--text">
                                            Force Entrance
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AlreadyInClassName
