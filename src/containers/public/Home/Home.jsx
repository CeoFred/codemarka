import React from "react";
import Button from "../../../components/Partials/Button";
import { Link } from "react-router-dom";
import Macbook from "../../../media/images/svg/devices/macbook.svg";

import "../styles.css";
import * as url from "../../../config/url";
import laptopImg from '../../../media/images/Screenshot(68).png';


export default function Home() {
  return (
    <>
      <div className="header-container-fluid">
        <section className="header-bg slice py-8 bg-dark bg-cover bg-size--cover">
          <span className="mask bg-gradient-dark opacity-6" />
          <div className="container d-flex align-items-center text-center text-lg-left py-5">
            <div className="col px-0">
              <div className="row row-grid align-items-center">
                <div className="col-lg-8 text-center text-lg-left">
                  <h1 className="text-white mb-4">
                    We've helped bring together teams to solve their coding
                    problems from different parts of the world in realtime.
                  </h1>
                  <p className="lead text-white opacity-8">
                    Built for the community ,by the community. Feeling left out
                    already?
                  </p>
                  <div className="mt-5">
                    <Link
                      to={url.AUTH_SIGN_UP}
                      className="btn-inner--text text-white"
                    >
                      <Button color="warning" size="md" icon="btn-icon">
                        <span className="btn-inner--icon" />
                        Join
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="container mt-4">
        <div class="row row-grid align-items-center justify-content-between">
          <div class="col-lg-5 col-md-6 order-md-2">
            <div class="pr-md-4">
              <h3 class="h2 mt-4">Change the way you build websites</h3>
              <p class="lead my-4 lh-190">
                You can combine the power of real time programming and
                communication, linting and deployments.
              </p>
              <strong class="text-warning text-underline--dashed">
                Modularity at its best
              </strong>
            </div>
          </div>
          <div class="col-md-6 col-lg-7 order-md-1">
            <div class="frame-laptop">
              <img alt="Macbook" src={Macbook} className="img-fluid" />
              <div class="frame-inner">
                <img
                  alt="placeholder"
                  src={laptopImg}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="slice slice-xl bg-primary">
        <div class="container">
          <div class="row justify-content-center mb-6">
            <div class="col-lg-7 text-center">
              <h1 class="mb-4 text-white">Features that you really need</h1>
              <p class="lh-190 text-white opacity-8">
                With an intuitive markup, powerful and lightning fast build
                tools, codemarka has everything you need to turn your ideas into
                incredible products.
              </p>
            </div>
          </div>
          <div class="row mx-lg-n4">

            <div class="col-lg-4 col-md-6 px-lg-4">
              <div class="card shadow-none">
                <div class="p-3 d-flex">
                  <div>
                    <div class="icon icon-shape rounded-circle bg-warning text-white mr-4">
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
                        class="feather feather-check"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span class="h6">Real Time Communication</span>
                    <p class="text-sm text-muted mb-0">Time is precious</p>
                  </div>
                </div>
              </div>
              <div class="card shadow-none">
                <div class="p-3 d-flex">
                  <div>
                    <div class="icon icon-shape rounded-circle bg-primary text-white mr-4">
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
                        class="feather feather-check"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span class="h6">Code Liniting</span>
                    <p class="text-sm text-muted mb-0">Faster build time.</p>
                  </div>
                </div>
              </div>
              <div class="card shadow-none">
                <div class="p-3 d-flex">
                  <div>
                    <div class="icon icon-shape rounded-circle bg-danger text-white mr-4">
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
                        class="feather feather-check"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span class="h6">Live Preview</span>
                    <p class="text-sm text-muted mb-0">
                      Bringing your project to life.
                    </p>
                  </div>
                </div>
              </div>
            </div>

                        <div class="col-lg-4 col-md-6 px-lg-4">
              <div class="card shadow-none">
                <div class="p-3 d-flex">
                  <div>
                    <div class="icon icon-shape rounded-circle bg-warning text-white mr-4">
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
                        class="feather feather-check"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span class="h6">Classroom monitoring</span>
                    <p class="text-sm text-muted mb-0">Know when, why and how it happened.</p>
                  </div>
                </div>
              </div>
              <div class="card shadow-none">
                <div class="p-3 d-flex">
                  <div>
                    <div class="icon icon-shape rounded-circle bg-primary text-white mr-4">
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
                        class="feather feather-check"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span class="h6">Github Integration</span>
                    <p class="text-sm text-muted mb-0">Export class files to github.</p>
                  </div>
                </div>
              </div>

              <div class="card shadow-none">
                <div class="p-3 d-flex">
                  <div>
                    <div class="icon icon-shape rounded-circle bg-danger text-white mr-4">
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
                        class="feather feather-check"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span class="h6">Audio Broadcast</span>
                    <p class="text-sm text-muted mb-0">
                      If texts don't hit hard,voices might.
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div class="col-lg-4 col-md-6 px-lg-4">
              <div class="card shadow-none">
                <div class="p-3 d-flex">
                  <div>
                    <div class="icon icon-shape rounded-circle bg-success text-white mr-4">
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
                        class="feather feather-check"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span class="h6">20+ Language Support</span>
                    <p class="text-sm text-muted mb-0">Built for everyone.</p>
                  </div>
                </div>
              </div>


              <div class="card shadow-none">
                <div class="p-3 d-flex">
                  <div>
                    <div class="icon icon-shape rounded-circle bg-info text-white mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-check"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span class="h6">Cool widgets</span>
                    <p class="text-sm text-muted mb-0">
                      A boost to your project.
                    </p>
                  </div>
                </div>
              </div>


              <div class="card shadow-none">
                <div class="p-3 d-flex">
                  <div>
                    <div class="icon icon-shape rounded-circle bg-warning text-white mr-4">
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
                        class="feather feather-check"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span class="h6">Beautiful Layout</span>
                    <p class="text-sm text-muted mb-0">
                      Interface Matters to us.
                    </p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>
    </>
  );
}
