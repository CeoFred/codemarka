import React from "react";
import Button from "../../../components/Partials/Button";
import {Link} from 'react-router-dom';

import "../styles.css";
export default function Home() {
  return (
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
                  Built for the community ,by the community. Feeling left out already?
                </p>
                <div className="mt-5">
                  <Button
                    color="warning"
                    size='md'
                    icon='btn-icon'
                  >
                    <span className="btn-inner--icon">
                     
                    </span>
                    <Link to='/auth/join-us' className="btn-inner--text text-white">Join</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
