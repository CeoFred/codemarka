/** @format */

import React from 'react'
import Helmet from '../../components/SEO/helmet'

export default function Contact() {
    return (
        <React.Fragment>
            <Helmet title="Contact-Us" />
            <section class="slice py-6 pt-lg-7 pb-lg-8 bg-gradient-primary">
                <div class="container d-flex align-items-center text-center text-lg-left">
                    <div class="col px-0">
                        <div class="row row-grid align-items-center">
                            <div class="col-lg-6">
                                <h1 class="h1 text-white text-center text-lg-left my-4">
                                    Have a feature <strong>in mind?</strong>
                                </h1>
                                <p class="lead text-white text-center text-lg-left opacity-8">
                                    We are out to satify everyone, if you need
                                    an extra feature on codemarka do let us
                                    know.
                                </p>
                                <div class="mt-5 text-center text-lg-left">
                                    <a
                                        href="#sct-form-contact"
                                        data-scroll-to=""
                                        class="btn btn-white btn-lg btn-icon">
                                        <span class="btn-inner--icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="feather feather-edit-2">
                                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                            </svg>{' '}
                                        </span>
                                        <span class="btn-inner--text">
                                            Write a message
                                        </span>
                                    </a>
                                </div>
                                <div class="d-flex align-items-center justify-content-center justify-content-lg-left mt-5">
                                    <div class="col-auto text-sm text-white pl-0 pr-4">
                                        Trusted by:
                                    </div>
                                    <div class="client-group col">
                                        <div class="row">
                                            <div class="client col-3 py-3">
                                                <img
                                                    src="../../media/images/gd_dsc_lockup_vertical_white.png"
                                                    alt="developer students club"
                                                />
                                            </div>
                                            <div class="client col-3 py-3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="slice slice-lg">
                <div class="container">
                    <div class="row row-grid justify-content-between align-items-center">
                        <div class="col-lg-5">
                            <h3>
                                Somewhere in the world
                                <br />
                                Nigeria to be precise
                            </h3>
                            <p class="lead my-4">
                                E: <a href="#">codemarka.dev@gmail.com</a>
                                <br />
                                T: (+234) 8160 583 193
                            </p>
                            <p>
                                Want to share any feedback with us, report a
                                technical issue or just ask us a question? Fill
                                free to contact us and we will get back to you
                                shortly.
                            </p>
                        </div>
                        <div class="col-lg-6">
                            <div
                                id="map-custom"
                                class="map-canvas rounded-left"
                                data-lat="25.7617"
                                data-lng="-80.1918"
                                data-color="#0c66ff"
                                style={ { height: '600px' } }></div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="slice slice-lg" id="sct-form-contact">
                <div class="container position-relative zindex-100">
                    <div class="row justify-content-center mb-5">
                        <div class="col-lg-6 text-center">
                            <h3>Contact us</h3>
                            <p class="lh-190">
                                If there's something we can help you with, jut
                                let us know. We'll be more than happy to offer
                                you our help
                            </p>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <form id="form-contact">
                                <div class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your name"
                                        required=""
                                    />
                                </div>
                                <div class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="email"
                                        placeholder="email@example.com"
                                        required=""
                                    />
                                </div>
                                <div class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="text"
                                        placeholder="+40-745-234-567"
                                        required=""
                                    />
                                </div>
                                <div class="form-group">
                                    <textarea
                                        class="form-control form-control-lg"
                                        data-toggle="autosize"
                                        placeholder="Tell us a few words ..."
                                        rows="3"
                                        required=""></textarea>
                                </div>
                                <div class="text-center">
                                    <button
                                        type="reset"
                                        class="btn-reset d-none"></button>{' '}
                                    <button
                                        type="submit"
                                        class="btn btn-block btn-lg btn-primary mt-4">
                                        Send your message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
