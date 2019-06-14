import React, { Component } from 'react';

class Footer extends Component {

  render() {
    return (
      
    <div className="footer py-5 border-top text-center">
    <div className="container">
      <div className="row mb-5">
        <div className="col-12">
          <p className="mb-0">
            <a href="www.facebook.com" className="p-3"><span className="icon-facebook"></span></a>
            <a href="www.twitter.com" className="p-3"><span className="icon-twitter"></span></a>
            <a href="www.instagram.com" className="p-3"><span className="icon-instagram"></span></a>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <p className="mb-0">
            Copyright &copy; {document.write(new Date().getFullYear())}> All rights reserved | made with <i class="icon-heart" aria-hidden="true"></i> by <a href="https://ceofred.co" target="_blank" rel="noopener noreferrer" >codemon</a>
          </p>
        </div>
      </div>
    </div>
  </div>

    );
  }
}

export default Footer;
