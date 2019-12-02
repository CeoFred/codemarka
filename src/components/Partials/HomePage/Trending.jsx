import React,{ useEffect } from 'react';

import Preloader from "../Preloader";
function Trending() {

    useEffect(() => {
        fetchTrending().then(d => d.json()).then(rd => {
            content = rd;
            console.log(rd);
        }).catch(err => {
            console.error(err);
        })    
    });
    const host = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test" ? process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL

    let content = <Preloader />

const fetchTrending = () => {
    let url = `${host}classroom/trending/`;
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'Application/json')

    let fetchTrendingClassroomsRequest =  new Request(url, {
        method: 'GET',
        cache: 'default',
        headers: myHeaders,
        mode: 'cors'
    });

   return fetch(fetchTrendingClassroomsRequest)
}

    return (
        <div className="pt-5 pb-5 ">
           {/* <Preloader /> */}
           <div className="row">
               <div className="col-md-4">
               <div class="card bg-section-dark text-white hover-translate-y-n3 hover-shadow-lg overflow-hidden">
    
    <div class="card-body py-4">
        <small class="d-block text-sm mb-2">25 April, 2019</small>
        <a href="/#" class="h5 stretched-link lh-150">Class Topic here</a>
        <p class="mt-3 mb-0 lh-170">class description</p>
    </div>
    <div class="card-footer border-0 delimiter-top">
        <div class="row align-items-center">
            <div class="col-auto">
                <span class="avatar avatar-sm bg-primary rounded-circle">JD</span>
                <span class="text-sm mb-0 avatar-content">David Wally</span>
            </div>
            <div class="col text-right text-right">
                <div class="actions">
                    <a href="/#" class="action-item"><i  class="fa fa-heart mr-1"></i> 50</a>
                    <a href="/#" class="action-item"><i  class=" fa fa-eye mr-1"></i> 250</a>
                </div>
            </div>
        </div>
    </div>
</div>
               </div>
               <div className="col-md-4 h-40">
               <div class="card hover-translate-y-n3 hover-shadow-lg overflow-hidden">
    {/* <div class="position-relative overflow-hidden">
        <a href="/#" class="d-block">
            <img alt="colab" src={logo} class="card-img-top" />
        </a>
    </div> */}
    <div class="card-body py-4">
        <small class="d-block text-sm mb-2">25 April, 2019</small>
        <a href="/#" class="h5 stretched-link lh-150">Class Topic here</a>
        <p class="mt-3 mb-0 lh-170">class description</p>
    </div>
    <div class="card-footer border-0 delimiter-top">
        <div class="row align-items-center">
            <div class="col-auto">
                <span class="avatar avatar-sm bg-primary rounded-circle">JD</span>
                <span class="text-sm mb-0 avatar-content">David Wally</span>
            </div>
            <div class="col text-right text-right">
                <div class="actions">
                    <a href="/#" class="action-item"><i  class="fa fa-heart mr-1"></i> 50</a>
                    <a href="/#" class="action-item"><i  class=" fa fa-eye mr-1"></i> 250</a>
                </div>
            </div>
        </div>
    </div>
</div>
               </div>

               
               <div className="col-md-4 h-40">
               <div class="card hover-translate-y-n3 hover-shadow-lg overflow-hidden">
    {/* <div class="position-relative overflow-hidden">
        <a href="#" class="d-block">
            <img alt="colab" src={logo} class="card-img-top" />
        </a>
    </div> */}
    <div class="card-body bg-section-dark text-white py-4">
        <small class="d-block text-sm mb-2">25 April, 2019</small>
        <a href="#" class="h5 stretched-link lh-150">Class Topic here</a>
        <p class="mt-3 mb-0 lh-170">class description</p>
    </div>
    <div class="card-footer border-0 delimiter-top">
        <div class="row align-items-center">
            <div class="col-auto">
                <span class="avatar avatar-sm bg-primary rounded-circle">JD</span>
                <span class="text-sm mb-0 avatar-content">David Wally</span>
            </div>
            <div class="col text-right text-right">
                <div class="actions">
                    <a href="#" class="action-item"><i  class="fa fa-heart mr-1"></i> 50</a>
                    <a href="#" class="action-item"><i  class=" fa fa-eye mr-1"></i> 250</a>
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

export default Trending
