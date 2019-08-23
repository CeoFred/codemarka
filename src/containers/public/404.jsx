import React from 'react'

import Helmet from '../../components/SEO/helmet';
import './notFound';

export default function NotFound() {
    return (
        <div>
            <Helmet>
                
            </Helmet>
              <a href="../../index-2.html"
        class="btn btn-neutral btn-icon-only rounded-circle position-absolute left-4 top-4 d-none d-lg-inline-flex"
        data-toggle="tooltip" data-placement="right" title="Go back"><span class="btn-inner--icon"><i
                data-feather="arrow-left"></i></span></a>
    <section>
        <div class="container d-flex flex-column">
            <div class="row align-items-center justify-content-between min-vh-100">
                <div class="col-12 col-md-6 col-xl-7 order-md-2"><img alt="Image placeholder"
                        src="../../assets/img/svg/illustrations/illustration-13.svg" class="img-fluid" /></div>
                <div class="col-12 col-md-6 col-xl-5 order-md-1 text-center text-md-left">
                    <h6 class="display-1 mb-3 font-weight-600 text-warning">Ooops!</h6>
                    <p class="lead text-lg mb-5">The page you are looking for could not be found.</p><a
                        href=../../index-2.html class="btn btn-dark btn-icon hover-translate-y-n3"><span
                            class=btn-inner--icon><i data-feather=home></i></span> <span class=btn-inner--text>Return
                            home</span></a>
                </div>
            </div>
        </div>
    </section>
    <div class="modal fade fixed-right" id=modal-products tabindex=-1 role=dialog aria-hidden=true>
        <div class="modal-dialog modal-vertical" role=document>
            <div class=modal-content>
                <div class=scrollbar-inner>
                    <div class=modal-body>
                        <h5 class="h6 mt-3">Bootstrap Themes</h5>
                        <p class=text-sm>Our users love how easy is to work with our themes. Easy to switch, play and
                            develop new products.</p>
                        <hr class=my-4>
                        <div class="card card-overlay hover-shadow-lg">
                            <div class=h-100><img
                                    src=../../../../webpixels.s3.eu-central-1.amazonaws.com/public/themes/products/quick-website-ui-kit.png
                                    class=card-img-top alt="Quick Website UI Kit"></div>
                            <div class="card-img-overlay d-flex flex-column align-items-center p-0">
                                <div class="overlay-actions w-100 card-footer mt-auto"><a
                                        href=https://themes.getbootstrap.com/product/purpose-quick-ui-kit/
                                        class="h6 mb-0 stretched-link" target=_blank>Quick Website UI Kit</a></div>
                            </div>
                        </div>
                        <div class="card card-overlay hover-shadow-lg">
                            <div class=h-100><img
                                    src=../../../../webpixels.s3.eu-central-1.amazonaws.com/public/themes/products/purpose-website-ui-kit.png
                                    class=card-img-top alt="Purpose Website UI Kit"></div>
                            <div class="card-img-overlay d-flex flex-column align-items-center p-0">
                                <div class="overlay-actions w-100 card-footer mt-auto"><a
                                        href=https://themes.getbootstrap.com/product/purpose-website-ui-kit/
                                        class="h6 mb-0 stretched-link" target=_blank>Purpose Website UI Kit</a></div>
                            </div>
                        </div>
                        <div class="card card-overlay hover-shadow-lg">
                            <div class=h-100><img
                                    src=../../../../webpixels.s3.eu-central-1.amazonaws.com/public/themes/products/purpose-application-ui-kit.png
                                    class=card-img-top alt="Purpose Application UI Kit"></div>
                            <div class="card-img-overlay d-flex flex-column align-items-center p-0">
                                <div class="overlay-actions w-100 card-footer mt-auto"><a
                                        href=https://themes.getbootstrap.com/product/purpose-application-ui-kit/
                                        class="h6 mb-0 stretched-link" target=_blank>Purpose Application UI Kit</a>
                                </div>
                            </div>
                        </div>
                        <div class="card card-placeholder align-items-center flex-column justify-content-center border-dashed"
                            style=height:250px>
                            <div class="col text-center">
                                <div class=pt-5><i data-feather=smile class=text-primary
                                        style=width:50px;height:50px></i> <span class="h5 d-block mt-3">What's
                                        next?</span></div>
                                <p class="text-sm px-4 mt-2 mb-0">We are already working on a new product, so stay
                                    tuned.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
    )
}
