import React, { Component } from 'react';

class Nav extends Component {

  render() {
    return (
        <div>
        <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>
  
      <div className="container d-none d-lg-block">
        <div className="row">
          <div className="col-11 text-center">
              <span className="mb-0 site-logo"><a href="index.html" className="text-black h2 mb-0">Colab<span className="text-primary">.</span> </a></span>
  
            </div>
            <div className="col-1 p-2">
              <a href="user/profile/" id="user">Alfred</a>
            </div>
        </div>
      </div>
      
      <header className="site-navbar py-md-4 js-sticky-header site-navbar-target" role="banner">
  
        <div className="container">
          <div className="row align-items-center">
  
            <div className="col-6 col-md-6 col-xl-2  d-block d-lg-none">
              <h1 className="mb-0 site-logo"><a href="index.html" className="text-black h2 mb-0">colab<span className="text-primary">.</span> </a></h1>
            </div>
  
            <div className="col-12 col-md-10 main-menu">
              <nav className="site-navigation position-relative text-center" role="navigation">
  
                <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block" >
                  <li><a href="#home-section" className="nav-link">Home</a></li>
                  <li><a href="#features-section" className="nav-link">Features</a></li>
                  <li><a href="#about-section" className="nav-link">About</a></li>
                  <li><a href="#testimonials-section" className="nav-link">Testimonials</a></li>
                  <li><a href="#contact-section" className="nav-link">Contact</a></li>
                </ul>
              </nav>
  
            </div>
  
  
            <div className="col-6 col-md-6 d-inline-block d-lg-none ml-md-0" ><a href="#" className="site-menu-toggle js-menu-toggle text-black float-right"><span className="icon-menu h3"></span></a></div>
  
          </div>
        </div>
  
      </header>
</div>  
    );
  }
}

export default Nav;
