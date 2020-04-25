import React, { useEffect, useState, useRef } from 'react'
import * as APIURL from '../../config/api_url';


export default function FetchCommunities() {
  const [state, setstate] = useState({ fetched: false, results: null });
  const content = useRef('');
  
  const returnStars = (stars) => {
    if(stars === 0) return;
    for (let index = 0; index <= stars; index++) {
      return (
        <i className="fa fa-star" style={{color:'yellow'}}></i>
      )
    }
    let remaining = 5 - stars;
    for (let index = 0; index <= remaining; index++) {
      return (
        <i className="fa fa-star"></i>
      )
    }
  }

  useEffect(() => {
    if (!state.fetched) {

      const url = APIURL.GET_COMMUNITIES;

      const request = new Request(url, {
        method: 'GET',
        cache: 'default',
        mode: 'cors'
      });

      fetch(request).then(data => data.json()).then(d => {
        if (d.data) {
          content.current = d.data.map((comm) => {
            return (
              <div className="col-md-3 col-12">
                <div class="card hover-shadow-lg hover-translate-y-n3">
                  <div class="card-body py-5 text-center h-100">
                    <a href={`community/${comm.kid}`} class="avatar rounded-circle avatar-lg hover-translate-y-n3">
                      <img src={comm.logo} />
                    </a>
            <p className="font-weight-bold">{comm.name}</p>
                    <span class="static-rating d-block">
                        {returnStars(comm.rating)}
                    </span>
                    <h5 class="h6 mt-4 mb-1">{comm.rating} out of 5 stars</h5>
                    <p class="text-muted text-sm mb-0">
                      from {comm.reviews.length} reviews
                    </p>
                    <span className="clearfix"></span>
                    <div class="mt-3 pt-3 delimiter-top">
                      <div class="actions"><a href="#!" class="action-item mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></a> <a href="#!" class="action-item mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a> <a href="#!" class="action-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></a></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          });
          setstate({ fetched: true, results: d.data });

        }
      }).catch((err) => {
        setstate({ fetched: true, results: [] });
      });

    }
  })


  return (
    <div className="pt-5 pb-5 text-center">
      <div className="row text-center align-content-center">
        {content.current}
      </div>
    </div>

  )
}
