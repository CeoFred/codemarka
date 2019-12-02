import React from 'react'


import TrendingClassrooms from "../../../components/Partials/HomePage/Trending";

import "./auth.css";

function Auth_Home() {
    return (
        <div className="colab__container">
           {/* start search container */}
            <div className="search__container row">
                <div className="search__input__container">
                <div className="card border-0 shadow-lg rounded-lg card-dark bg-translucent-white">
    <div className="card-body">
        <h5 className="font-weight-bold text-center mb-2">Find Classrooms</h5>
        <div className="form-group">
    <div className="input-group">
      <input type="search" className="form-control"
       placeholder="Over 1,000,000 Classrooms"
        aria-label="Over 1,000,000 Classrooms"
         aria-describedby="basic-addon2" />
      <div className="input-group-append">
        <button type="button" className="btn btn-success" id="basic-addon2"><i className="fa fa-search"></i></button>
      </div>
    </div>
</div>
    </div>
</div>
                </div>
            </div>

{/* end search container */}


<div className="all__classrooms__container">
    <div className="row mr-3 ml-3">
        <div className="trending__container w-100 pt-4">
            <div className="trending__title mb-3 text-center ">
                <h3 className="font-weight-700 text-capitalize d-inline pr-3">Trending </h3> <i className="fa fa-fire fa-4x"></i>
            </div>
        <TrendingClassrooms />
        </div>
    </div>
</div>
        </div>
    )
}


export default Auth_Home;