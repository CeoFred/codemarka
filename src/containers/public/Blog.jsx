import React from 'react';

import pic1 from "./Blog/images/declear var not war.jpg"
import pic2 from "./Blog/images/game-loop.png"
import pic3 from "./Blog/images/Intern.PNG"
import pic4 from "./Blog/images/js datatypes.png"

import './styles.css';
import Helmet from '../../components/SEO/helmet';

export default function Home() {
  const blogData = [
    { title: "Codemarka V2 has been released", img: pic1 }, 
    { title: "Codemarka won the grammy", img: pic2 },
    { title: "Lawsuit against fummy guys", img: pic3 },
    { title: "This dude used codemarka to teach Vue", img: pic4 }
  ]
  return (
    <div className="header-container-fluid">
      <style>
        {`
          .card-size {
            width:250px;
          }
          .c-card-title {
            color: var(--dark-light);
          }
          .posts .card {
            margin-right: 2rem;
          }
        `}
      </style>
      <Helmet title="Blog | Codemarka" metaDescription="" />
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
                    Codemarka version 2 is released
                                  </h1>
                  <p class="lead text-white opaci ty-8 tal-sm font-weight-light">
                    Release notes: With version 2, you can send audio messages in the classroom.
                    You can also save classroom
                    Release notes: With version 2, you can send audio messages in the classroom.
                    You can also save classroom
                                  </p>
                  <div class="mt-5">
                    <a
                      href="/public/blog/version-2-launched"
                      class="btn btn-warning btn-lg">
                      <span class="btn-inner--text">Read More</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="shape-container shape-line shape-position-bottom"></div>
      </section>

      <section class="slice slice-lg">
        <div class="container">
          <h1>Latest Posts</h1>
          <div className="row posts">
            {
              blogData.map(x => <div className="card">
              <div className="card-header">
                <div className="card-img" >
                  <img width="250px" src={x.img} alt="Some image" />
                </div>
              </div>
              <div className="card-body card-size">
                <h4 className="c-card-title">{x.title}</h4>
              </div>
            </div>)
            }
          </div>
        </div>
      </section>
    </div>
  )
};