import React from "react";

import "./styles.css";
import svg from "../../images/slider-primary1.svg";
import Helmet from "../../components/SEO/helmet";
import dev1 from "../../images/developers/person-1.jpg";
import targetSvg from '../../images/svg/ico-target.svg';

export default function Home() {
  return (
      <div className="header-container-fluid">
          <Helmet title="About us" metaDescription="" />
          <section className="header-bg slice py-8 bg-dark bg-cover bg-size--cover">
              <span className="mask bg-gradient-dark opacity-9" />
              <div className="container d-flex align-items-center text-center text-lg-left py-5">
                  <div className="col px-0">
                      <div className="row row-grid align-items-center">
                          <div className="col-lg-8 text-center text-lg-left">
                              <h1 className="text-white mb-4">What About colab!</h1>
                              <hr />
                              <p className="lead text-white opacity-8">
                  Colab, is a web based platform built with love 
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <section>
              <div className="story-container text-center">
                  <div className="mb-5">
                      <h1 className="text-black mt-6 mb-2">Our Story In a Nutshell</h1>
                      <p className="text-black mt-4">
              We've been having the time of our lives for more than 10 years
              now.
                      </p>
                  </div>
                  <div className="container-fluid mt-4">
                      <div className="row row-grid">
                          <div className="col-lg-6 col-sm-12 col-md-12">
                              <img src={ svg } alt="svg" />
                          </div>
                          <div className="col-lg-6 col-sm-12 col-md-12 bg-info text-white p-5">
                              <b className=" text-center justify-content-center">
                  We are a young and ambitious bunch of creative people who
                  simply want to make a difference through our work. Giving it
                  all we've got while genuinely having fun is the formula
                  helping us face every challenge with a smile. Expressing
                  ourselves through our work while fostering a culture of always
                  pursuing optimal solutions rather than writing just plain code
                  is what helps us deliver fantastic results. Simplicity,
                  functionality and elegance is what we strive for in our work.
                              </b>
                          </div>
                      </div>
                  </div>
                  <div className="container">
                      <div className="row mb-6 justify-content-center text-center">
                          <div className="col-lg-8 col-md-10">
                              <h2 className="mt-4">The amazing team</h2>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-lg-3 col-sm-6 mb-5">
                              <div data-animate-hover="2">
                                  <div className="animate-this">
                                      <img
                      src={ dev1 }
                      alt="developer"
                      className="img-fluid rounded shadow"
                    />
                                  </div>
                                  <div className="mt-3">
                                      <h5 className="h6 mb-0">Developers Name</h5>
                                      <p className="text-muted text-sm mb-0">Developers Role</p>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-3 col-sm-6 mb-5">
                              <div data-animate-hover="2">
                                  <div className="animate-this">
                                      <img
                      src={ dev1 }
                      alt="developer"
                      className="img-fluid rounded shadow"
                    />
                                  </div>
                                  <div className="mt-3">
                                      <h5 className="h6 mb-0">Developers Name</h5>
                                      <p className="text-muted text-sm mb-0">Developers Role</p>
                                  </div>
                              </div>
                          </div><div className="col-lg-3 col-sm-6 mb-5">
                              <div data-animate-hover="2">
                                  <div className="animate-this">
                                      <img
                      src={ dev1 }
                      alt="developer"
                      className="img-fluid rounded shadow"
                    />
                                  </div>
                                  <div className="mt-3">
                                      <h5 className="h6 mb-0">Developers Name</h5>
                                      <p className="text-muted text-sm mb-0">Developers Role</p>
                                  </div>
                              </div>
                          </div><div className="col-lg-3 col-sm-6 mb-5">
                              <div data-animate-hover="2">
                                  <div className="animate-this">
                                      <img
                      src={ dev1 }
                      alt="developer"
                      className="img-fluid rounded shadow"
                    />
                                  </div>
                                  <div className="mt-3">
                                      <h5 className="h6 mb-0">Developers Name</h5>
                                      <p className="text-muted text-sm mb-0">Developers Role</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <hr/>
                      {/* misson, vision */}
                      <section className="text-center mt-4">
                          <div className="row">
                              <div className="mt-4 p-2 col-6">
                                  <img className="target_icon" src={ targetSvg } alt="target_ico"/>
                                  <h3 className="text-black h3">Mission</h3>
                                  <p className="text-black mt-3">
                    Providing a simple suite of management tools, training, and support to
                     enable small businesses to build and maintain relationships and compete in 
                     the global market.

iBCS (Internet Business Consulting Services) is a web application, programming, and Search Engine Optimization (SEO) company. Our technology consultants help businesses be more successful by leveraging Internet and web-based tools and technologies.  Our experienced technology specialists help businesses run smoothly and gain a competitive advantage using modern Internet business tools.
 We provide the best and the most cost-effective consultancy services possible in a continually evolving digital world to help deliver a professional web presence for your business.
                                  </p>
                              </div>
                              <div className="mt-4 p-2 col-6">
        
                              </div>

                          </div>
                      </section>
            
                      {/* misson, vision */}

                  </div>
              </div>
          </section>
      </div>
  );
}
