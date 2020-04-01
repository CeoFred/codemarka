import React from 'react';

import pic1 from "./images/declear var not war.jpg"
import '../styles.css';
import Helmet from '../../../components/SEO/helmet';

export default function VERSION2() {

  return (
    <div className="header-container-fluid">
      <style>
        {`
          .blog-width{
            width:600px;
          }
          @media(max-width: 700px){
            .blog-width{
              width:400px;
            }
          }
          @media(max-width: 450px){
            .blog-width{
              width:calc(100vw - 50px);
            }
          }
        `}
      </style>
      <Helmet title="Version 2 Launched | Codemarka" metaDescription="" />
      <section class="slice py-8 bg-dark bg-cover bg-size--cover">
        <span class="mask bg-gradient-dark opacity-9"></span>
        <div
          data-offset-top="#navbar-main"
          style={{ paddingTop: '59px' }}>
          <div class="container d-flex align-items-center text-center text-lg-left py-5">
            <div class="col px-0">
              <div class="row row-grid align-items-center">
                <div class="col-lg-8 text-lg-left text-sm-left text-md-left">
                  <h1 class="text-white mb-4 tal-sm font-weight-bold">
                    Codemarka version 2 is released</h1>
                  <p class="lead text-white opaci ty-8 tal-sm font-weight-light">
                    Release notes: With version 2, you can send audio messages in the classroom.
                    You can also save classroom
                    Release notes: With version 2, you can send audio messages in the classroom.
                    You can also save classroom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="shape-container shape-line shape-position-bottom"></div>
      </section>

      <section class="slice slice-lg">
        <div class="container blog-width">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus, doloribus? Reiciendis amet consequatur, nulla quaerat nihil blanditiis quia repellendus deserunt ullam esse voluptas mollitia placeat earum possimus provident quam. Quo?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus, doloribus? Reiciendis amet consequatur, nulla quaerat nihil blanditiis quia repellendus deserunt ullam esse voluptas mollitia placeat earum possimus provident quam. Quo?</p>
          <img src={pic1} alt="Some nice thing"/>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus, doloribus? Reiciendis amet consequatur, nulla quaerat nihil blanditiis quia repellendus deserunt ullam esse voluptas mollitia placeat earum possimus provident quam. Quo?</p>
          <img src={pic1} alt="Some nice thing"/>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus, doloribus? Reiciendis amet consequatur, nulla quaerat nihil blanditiis quia repellendus deserunt ullam esse voluptas mollitia placeat earum possimus provident quam. Quo?</p>
        </div>
      </section>
    </div>
  )
};